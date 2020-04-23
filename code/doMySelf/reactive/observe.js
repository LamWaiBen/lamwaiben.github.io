const util = require('./util')
const arrayMethods = require('./array')
const { Dep } = require('./Dep')

class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()            // 这里存放的依赖在 添加/删除属性, 修改数组元素 时触发

        util.def(value, '__ob__', this)

        if (Array.isArray(value)) {
            value.__proto__ = arrayMethods
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

    observeArray(data) {
        for (let v of data) {
            observe(v)
        }
    }
}

/////////////////////////////////////////////////////////////////////////

function observe(data) {
    if (!util.isObject(data)) return
    let ob;
    if (util.hasOwn(data, '__ob__') && data.__ob__ instanceof Observer) {        // 避免重复观察
        ob = data.__ob__
    } else {
        ob = new Observer(data)
    }
    return ob
}

function defineReactive(obj, key, val) {
    let dep = new Dep()
    let childOb = observe(val)

    const propDes = Object.getOwnPropertyDescriptor(obj, key)
    let getter = propDes && propDes.getter
    let setter = propDes && propDes.setter

    Object.defineProperty(obj, key, {
        get: function defineReactiveGetter() {
            const v = getter ? getter.call(obj) : val
            dep.depend()                        // 1. 目的: 当前key的val 被修改时

            // 属性为对象/数组时, 需要收集属性变化, 配合 $set 设置属性时触发依赖
            if (childOb) {                      // 当val为对象/数组, val内部有修改时, 也需要通知引用当前key的地方
                childOb.dep.depend()            // 2. 目的: val被增删属性时
                if (Array.isArray(v)) {
                    defineArray(v)              // 3. 目的: 当数组中的对象子元素修改时
                }
            }

            return val
        },

        set: function defineReactiveSetter(newVal) {
            const v = getter ? getter.call(obj) : val
            if (v === newVal) return

            if(setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }

            childOb = observe(newVal)
            dep.notify()
        }
    })
}

function defineArray(data) {
    for (let v of data) {
        v && v.__ob__ && v.__ob__.dep.depend()
        if(Array.isArray(v)){
            defineArray(v)
        }
    }
}



///////////////////////////////////

// 增加属性
function $set(target, key, value) {
    defineReactive(target, key, value)
    target.__ob__.dep.notify()     // 对象上增加属性后, 需要通知对象触发依赖函数
}

function $delete(target, key) {
    if(Array.isArray(target)){
        target.splice(key, 1)
    }
    if (!hasOwn(target, key)) {
        return
    }
    delete target[key]

    target.__ob__ && target.__ob__.dep.notify()
}

// 观察属性
function watch(data, exec, fn){
    Dep.target = fn
    if(typeof exec === 'function'){     // 函数中引用观察值时, 需要触发函数来收集依赖
        exec()
    } else if(/\./.test(exec)) {
        let v = data
        for(let key of exec.split('.')){
            v = v[key]
        }
    } else {
        data[exec]
    }

    Dep.target = null
}

module.exports = { observe, watch, Dep, $set, $delete }