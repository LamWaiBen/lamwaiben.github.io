// promise
class FPromise {
    constructor(execFn) {
        execFn(resolve.bind(this), reject.bind(this))

        this.status = 'fulfill'
        this.value = undefined

        this.onResolveList = []
        this.onRejectList = []

        function resolve(val) {
            if (this.status != 'fulfill') return
            this.value = val
            this.status = 'resolve'
            setTimeout(() => {
                this.onResolveList.forEach(fn => {
                    fn(this.value)
                })
            })
        }

        function reject(err) {
            if (this.status != 'fulfill') return
            this.value = err
            this.status = 'reject'
            setTimeout(() => {
                this.onRejectList.forEach(fn => {
                    fn(this.value)
                })
            })
        }
    }

    then(onResolve, onReject) {
        onResolve = typeof onResolve === 'function' ? onResolve : v => v
        onReject = typeof onReject === 'function' ? onReject : reason => { throw reason }
        return new FPromise((resolve, reject) => {
            this.onResolveList.push((returnVal) => {
                try {
                    let val = onResolve(returnVal)
                    // check val type
                    if (val && (val instanceof FPromise || typeof val['then'] === 'function')) {
                        val.then(resolve, reject)
                    } else {
                        resolve(val)
                    }
                } catch (error) {
                    reject(error)
                }
            })

            this.onRejectList.push(reason => {
                try {
                    let val = onReject(reason)
                    if (val && (val instanceof FPromise || typeof val['then'] === 'function')) {
                        val.then(resolve, reject)
                    } else {
                        reject(val)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    catch(onReject) {
        this.then(null, onReject)
    }

    _resolvePromise(newPromise, x, resolve, reject) {
        try {
            if (newPromise === x) return reject(new Error('循环引用'))
            if (x && (x instanceof FPromise || typeof x['then'] === 'function')) {
                x.then(resolve, reject)
            } else {
                resolve(x)
            }
        } catch (error) {
            reject(error)
        }
    }
}


// new Promise((resolve, reject) => {
//     resolve(1)
// }).then(res => console.log(1))

// co
function run(gen, ...args) {
    let g = gen(...args)
    return new Promise((resolve, reject) => {
        function next(lastValue) {
            let { value, done } = g.next(lastValue)
            if (value instanceof Promise) {
                value.then(done ? resolve : next)
            } else {
                (done ? resolve : next)(value)
            }
        }

        return next()
    })
}

function* foo(...args) {
    let a = yield Promise.resolve(1)
    console.log(a)
    let b = yield new Promise(resolve => setTimeout(() => {
        resolve(args[0] * 2)
    }), 1000)
    console.log(b)
    let c = 9
    console.log(a, b, c)

    return a + b + c
}

var a = run(foo, 2)


// ajax
function ajax(method, url, data = {}, headers = {}) {
    let xhr = new XMLHttpRequest()
    let p = new Promise((resolve, reject) => {
        xhr.open(method, url)

        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key])
        }

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    let res = xhr.response
                    resolve(res)
                }
            }
        }

        xhr.onerror = function () {
            reject(this.responseText)
        }

        xhr.onabort = function () {
            reject('trigger abort')
        }


        let body = data;
        // if(header.contentType === 'xxx')
        xhr.send(body)

    })
    p.abort = xhr.abort.bind(xhr)

    return p
}
// fetch
function request(method, url, data = {}, headers = {}, options = {}) {
    const {
        cache = "default",
        credentials = "same-origin",
        mode = "same-origin",
        referrer = "client",
        redirect = "follow",
    } = options;
    let request = new Request(url, {
        method,
        body: JSON.stringify(data),
        headers,
        cache,
        credentials,
        mode,
        referrer,
        redirect
    })

    return fetch(request).then(res => res.json())
}


// jsonp
function foo(res) {
    console.log(res)
}
function jsonp(cbFunName, a, b) {
    let script = document.createElement('script')
    script.src = `localhost:8080/api/jsonp?callback=${cbFunName}&a=${a}&b=${b}`
    document.body.appendChild(script)
    // script 内容:  foo(12)
}



// debounce  throttle
function debounce(fn, delay) {
    let timer = null;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay)
    }
}

function throttle(fn, delay) {
    let timer = null;
    return (...args) => {
        if (timer) return
        timer = setTimeout(() => {
            timer = null
            fn(...args)
        }, delay)
    }
}

// time-slicing
function ts(gen, ms) {
    if (Object.prototype.toString.call(gen) != '[object GeneratorFunction]') return gen()
    let g = gen()

    let nextReleaseTime = performance.now() + ms;
    function next() {
        let res;
        do {
            res = g.next()
        } while (!res.done && performance.now() < nextReleaseTime);
        console.log(new Date(), nextReleaseTime, res.value)
        if (res.done) return res.value;
        nextReleaseTime = performance.now() + ms
        return setTimeout(next) // 让出主线程
    }
    return next()
}

function* bar() {
    let length = 10e7
    let arr = Array(length)
    for (let i = 0; i < length; i++) {
        arr[i] = i
        yield i;
    }
}

var a = ts(bar, 16)




// nextTick
let nextTick = (function () {
    let callbacks = []
    let timeFunc = null

    function nextTickHandle() {
        for (let fn of callbacks) {
            fn()
        }
        callbacks = []
    }

    if (!timeFunc) {
        let observer = new MutationObserver(nextTickHandle)
        let counter = 1
        var textNode = document.createTextNode(counter)
        observer.observe(textNode, {
            characterData: true
        })

        timeFunc = function () {
            counter = (counter + 1) % 2
            textNode.data = counter
        }
    }

    return (cb, ctx) => {
        let func = ctx ? function () { cb.call(ctx) } : cb
        callbacks.push(func)
        timeFunc(nextTickHandle)
    }
})()


// copy
let baseTypeof = ['']
function getType(v) { return typeof v }
function isObject(v) {
    return typeof v === 'object' || v !== null
}
function copy(v, map = new WeakMap()) {
    // 1. 基本类型

    // 2. 函数

    // 3. 对象
    // 2.1  数组
    // 2.2  set
    // 2.3  map
    // 
    // 2.x  自定对象

    if (!isObject(v)) return v


}


/**
 * 单一职责
 * 接口分离
 * 里氏替换
 * 依赖倒转
 * 迪米特(最少知道)
 * 开闭
 * 
 * 
 * 创建型
 * 工厂, 抽象工厂, 单例, 原型, 建造者
 * 
 * 结构型
 * 适配器, 装饰器, 代理, 外观, 桥接, 组合, 享元 
 * 
 * 行为型
 * 策略, 观察者, 模板方法, 职责链, 备忘录,  状态, 命令, 中介者,  访问者, 迭代器, 解释器
 * 
 * 
 * 
 */



function observe(value, isRoot) {
    if (!(value instanceof Object)) return;

    let ob;
    if (Object.getOwnPropertyNames(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }

    if (isRoot && ob) {
        ob.vmCount++
    }
    return ob
}

class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0

        Object.defineProperty(value, '__ob__', {
            value: this
        })

        if (Array.isArray(value)) {
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(data) {
        for (let key in data) {
            defineReactive(data, key, data[key])
        }
    }

    observeArray(arr) {
        for (let i = 0; i < arr.length; i++) {
            observe(arr[i])
        }
    }
}

class Dep {
    constructor() {
        this.list = []
    }

    depend() {
        if (Dep.Target) {
            if (this.list.findIndex(fn => fn === Dep.Target) === -1) {
                this.list.push(Dep.Target)
            }
            Dep.Target = null
        }
    }

    notify() {
        this.list.forEach(fn => fn())
    }
}

function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        let e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }

    }
}

function watch(exp, fn) {
    Dep.Target = fn
    // exp 可能为render函数
    if (typeof exp === 'function') {
        fn()
        return
    }

    if ('/\./'.test(exp)) {
        let keys = key.split('.')
        let obj = data
        for (let k of keys) {
            obj = obj[k]
        }

        return
    }
    data[exp]
}


function defineReactive(obj, key, val) {

    const dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key)
    const getter = property && property.get
    const setter = property && property.set

    let childOb = observe(val, false)

    Object.defineProperty(obj, key, {
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val

            dep.depend()
            if (childOb) {
                childOb.dep.depend()        // dep_key  dep_obj
                if (Array.isArray(value)) {
                    dependArray(value)      // dep_key, dep_childArr
                }
            }

            return value
        },
        set: function reactiveSetter(newValue) {
            const value = getter ? getter.call(obj) : val
            if (newValue == value) return

            if (setter) {
                setter.call(obj, newValue)
            } else {
                val = newValue
            }

            childOb = observe(newValue)
            dep.notify()
        }
    })
}
// {arr: [[1,2]]}, arr,  [[1,2]]
// {arr: [[1,2]]}, arr,  [1, 2].__ob__.dep.depend()


const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

methodsToPatch.forEach(method => {
    let original = Array.prototype[method]
    Array.prototype[method] = function (...args) {
        const result = original.apply(this, args)
        let ob = this.__ob__
        let inserted;
        switch (key) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
                break;
            default:
                break;
        }

        if (inserted) ob.observeArray(inserted)

        ob.dep.notify()
        return result
    }
})


new Promise(resolve => {
    resolve()
    Promise.resolve(
    // {
    //     then: resolve => {
    //         console.log(1)
    //         resolve()
    //     }
    // }
    // new Promise(resolve => {
    //     resolve()
    // }).then(() => console.log(1))
    ).then(res => {
        console.log(2)
    })
    console.log(0)
}).then(res => {
    console.log(3)
})
