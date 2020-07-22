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



/**
 * 
 * 
 * TCP
 * 面向连接, 基于字节流, 可靠
 * 
 * 头 标志位  序号 确认序号 窗口 数据体
 * 标志位: ACK SYN FIN RST PSH
 * 
 * 3.1 SYN seq=x  SYN_SEND
 * 3.2 ACK, SYN , seq=y, ack=x+1  SYN_RCVD
 * 3.3 ACK ack=y+1, seq=x+1  ENTABLISH
 * 
 * SYN_Cookie, 扩充池
 * 
 * 4.1 FIN seq=p        FIN_WAIT1
 * 4.2 ACK ack=p+1      FIN_WAIT2           COLSE_WAIT
 * 4.3 FIN seq=q                            LAST_ACT
 * 4.4 ACK ack=q+1, seq=p+1    TIME_WAIT  2MSL( ACK + FIN)
 * 双工, 传输和发送互不影响, 所以需要等待最后的数据发送完毕才能关闭
 * 
 * SYN_FLOOD
 * 
 * 流量控制
 *  接收端根据自身能力返回滑动窗口, 控制发送方发送的数据量
 * 
 * 拥塞控制  
 * 拥塞窗口cwnd
 * 慢启动, 拥塞避免, 快速重传, 快速恢复 
 * 
 * 延迟控制
 * nagle算法: 延迟发送
 * 延迟确认
 * 
 * 
 * UDP
 * 无连接, 基于报文, 
 * 
 * 实时性高, 直播, 多人大星游戏 
 * 
 * 
 * 
 * HTTP
 * status
 * 
 * 100
 * 101
 * 
 * 200
 * 202
 * 204
 * 206
 * 
 * 301
 * 302
 * 304
 * 
 * 400
 * 401
 * 403
 * 404
 * 405
 * 
 * 500
 * 502
 * 503
 * 505
 * 
 * 
 * 请求头
 * Accept
 * Accept-Language
 * Accept-Encoding
 * Content-Type
 * Content-Length
 * Cache-Control
 * Pragma
 * Cookie
 * If-Modified-Since
 * If-Unmodified-Since
 * If-Matched
 * If-None-Matched
 * Range:btyes=start=end
 * Via
 * Host
 * Referer
 * Origin
 * User-agent
 * Connection
 * Upgrade
 * 
 * 
 * content-Type
 * Content-Legiont
 * Transfer-encode; chunk
 * Cache-Control
 * Set-Cookie
 * Expires
 * ETag
 * Last-Modified
 * Access-Control-Allow-Methods/Headers/Credential
 * Access-Controll-Max-Age
 * Accept-Range: bytes
 * content-range: btyes=start-end/total
 * 
 * 
 * 
 * Https
 * 1. r1 + method + version
 * 2. r2 + cert 
 * 3. check cert + r3 encode by cert
 * 4. r3 decode by pem,  r1 + r2 + r3  => r4
 * 5. session by r4
 * 
 * cert = publick domain 
 * 
 * 
 * 
 * 
 * HTTP2 
 * 
 * 二进制数据流, streamID
 * 多路复用, 不再堵塞,  通过响应ID 来找到请求
 * 服务器推送
 * 头信息压缩, 第一次发送需要, 后续不再需要(维护头信息表)
 * 
 * 
 * 
 * meta
 * 
 * <meta charset="utf-8">
 * 
 * name
 * <meta name="" content="">
 * author
 * descript
 * keywords
 * viewport  initial-scale width: device-width heigh:device-height maximum-scale minimum-scale (0, 10]
 * X-UA-Compatible IE=edge
 * referrer:  no-referrer-when-downgrade,  same-origin
 * robots: follow index, 
 * 
 * http-equiv
 * <meta http-equiv="" content="">
 * content-security-policy
 * content-type
 * set-cookie
 * refresh  1;url=asd
 * expries
 * pragma
 * 
 * 
 * 
 * script 
 * defer async
 * window.addEventListener('DOMContentLoaded')
 * 
 * 
 * link
 * rel=""  stylesheet / icon 
 * href
 * media
 * type  text/css  text/html
 * 
 * as something 
 * crossorigin
 * 
 * 
 * a 
 * href   
 * target: _blank  
 * 
 * form
 * action
 * method
 * 
 * 
 */


function loop(){

    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)




history.pushState(data, title, url)
history.replaceState(data,  title, url)
window.onpopstate = () => {}
window.onhashchange = () => {}
window.location.hash

navigator.serviceWorker.register('url', {}).then(registration => {
    registration.installing
    registration.waiting
    registration.active

    install

    message
    activate
    fetch
    sync

})


// document.createDocumentFragment()
function cb(){
    console.log('mutationObserver cb')
}
let observer = new MutationObserver(cb)

observer.observe(document.body)


function trigger(){
    document.body.innerText += 1
}



addEventListener(EventName, fn, false)
window.attachEvent('on' + EventName, fn)
dom['on' + EventName] = fn

removeEventListener(EventName, fn)
detachEvent('on' + EventName)

// stop
event.preventDefault()
event.returnValue = false

event.stopPropagation()
event.cancelBubble = true




/**
 * HMR
 * 1. webpack watch file to memory
 * 2. socket to client file change    hash
 * 3. client collect file hash, refresh / hmr
 * 4. client jsonp get new file by hash
 * 5. js replace cache,  if failure refresh
 * 
 * 
 */


/**
 * DFS
 */

function dfs_traverse(node){
    if(!node.value) return null

    // front
    traverse(node.left)
    // center
    traverse(node.right)
    // back
}

function bfs_traverse(node) {
    let arr = [node]
    while (arr.length) {
        // 队列先出
        let n = arr.shift()
        // do something
        if(n.left) arr.push(n.left)
        if (n.right) arr.push(n.right)
    }
}


/**
 * dijkstar
 */


 /**
  * co
  */


const m1 = async (ctx, next) => {
    console.log('m1 ===>', Object.keys(ctx))
    ctx.m1 = 1
    await next()

    console.log('m1 <===', Object.keys(ctx))
}
const m2 = async (ctx, next) => {
    console.log('m2 ===>', Object.keys(ctx))
    await next()
    ctx.m2 = 2
    console.log('m2 <===', Object.keys(ctx))
}
const middlewares = [m1, m2]
function co(ctx) {
    let index = -1;

    async function next() {
        index += 1
        let m = middlewares[index]
        if (m) {
            await m(ctx, next)
        }
    }
    return next()
}

let a = {a: 'a'}
co(a)

Array.prototype._splice = function splice(start, deleteCount = this.length - start, ...items){
    while (start < 0) {
        start = this.length + start
    }
    let tmp = items.slice()
    let res = []
    let count = deleteCount
    for(let i = start; i < this.length; i++) {
        if(count > 0) {
            count--
            res.push(this[i])
        } else {
            tmp.push(this[i])
        }
    }
    this.length = start
    for(let v of tmp) {
        this.push(v)
    }

    return res
}

var a = [1, 2, 3, 4, 5, 6]
var b = [1, 2, 3, 4, 5, 6]
console.log('splice', a.splice(3), a)
console.log('_splice', b._splice(3), b)



class _Promise{
    constructor(func) {
        this.status = 0
        this.val = undefined
        func(resolve.bind(this))

        this.resolveHandleList = []

        function resolve(val) {
            if(this.status === 0) {
                this.status = 1
                this.val = val
                this.resolveHandleList.forEach(fn => fn(val))
            }
        }
    }

    then(onResolve) {
        var newPromise = null
        return newPromise = new Promise(resolve => {
            if(this.status === 0 ) {
                this.resolveHandleList.push(v => {
                    setTimeout(() => {
                        let res = onResolve(v)
                        if (newPromise === res) throw new Error('循环引用')
                        if (res instanceof _Promise || (res && typeof res.then === 'function')) {
                            res.then(resolve)
                        } else {
                            resolve(res)
                        }
                    })
                })
            } else if(status === 1) {
                setTimeout(() => {
                    let res = onResolve(v)
                    if (res instanceof _Promise || (res && typeof res.then === 'function')) {
                        res.then(resolve)
                    } else {
                        resolve(res)
                    }
                })
            }
        })
    }
}

// try...catch 只能捕获运行在try..catch同步线程内的错误
function test (){
    return new Promise(resolve => {
        setTimeout(resolve)
    }).then(() => {
        return Promise.reject(123)
    }).catch(err => {
        console.log('catch error', err)
    }).then(() => {
        console.log('then')
    })
}

async function main() {
    // try {
        await test()
        console.log('main')
    // } catch (error) {
    //     console.log('main catch', error)
    // }
}
main()



// regexp 的进阶用法   xxx 为匹配的规则
// ?<name>(xxx)
// ?<=(xxx)
// ?=(xxx) 
const text1 = "2018-03-14";
const re1 = /(?<year>\d+)-(?<month>\d+)-(?<day>\d+)/;
console.log(re1.exec(text1).groups);



var text2 = `<br/><a target=_blank href="www.baidu.com">百度一下</a>百度才知道`;
var re2 = /(?<=(href=")).{1,200}(?=(">))/;
console.log(re2.exec(text2));


function shuffled(arr, count) {
    let temp = arr.slice(0), i = arr.length, min = Math.max(i - count, 0)
    while (i > min) {
        let index = Math.floor(i * Math.random())
        i--
        [temp[index], temp[i]] = [temp[i], temp[index]]
    }
    return temp.slice(min)
}