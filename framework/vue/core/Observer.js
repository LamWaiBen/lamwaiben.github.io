/**
 * Vue 2.0 的数据劫持
 * 
 */

const Dep = require('./Dep.js')
class Observer{
    constructor(value){
        this.vmCount = 0
        this.value = value
        this.dep = new Dep()
        Object.defineProperty(value, '__ob__', {
            value: this
        })

        if (Array.isArray(value)) {
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(data){
        for(let key in data) {
            defineReactive(data, key, data[key])
        }
    }

    observeArray(arr){
        for(let i = 0; i < arr.length; i++) {
            observe(arr[i])
        }
    }
}


function defineReactive(obj, key, val) {
    const dep = new Dep()

    let childOb = observe(val)  // 属性为对象时, 递归劫持
    Object.defineProperty(obj, key, {
        get() {
            if(Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
                if(Array.isArray(val)) {
                    dependArray(val)
                }
            }

            return val
        },

        set(newVal) {
            val = newVal
            childOb = observe(newVal)  // 赋值为对象时, 需要重新劫持
            dep.notify()
        }
    })
}


let vmCount = 1
function observe(obj) {
    let ob = null
    if(Reflect.ownKeys('__ob__')) {
        ob = obj.__ob__
    } else if (typeof obj === 'object' && obj) {
        ob = new Observer(obj)
        ob.vmCount = vmCount++
    }

    return ob
}


module.export = Observer;