/**
 * Vue 2.0
 * 一. 生命周期
 *      1. 生命周期初始化; 2. 父组件的事件初始化
 * 0. beforeCreate  
 *      1. inject; 2. state(props, methods, data, computed, watch); 3. provide
 * 1. created   
 *      
 * 2. beforeMount
 * 3. mounted
 * 4. beforeUpdate
 * 5. updated
 * 6. beforeDestory
 * 7. destory
 * 
 * 二. 双向数据绑定原理
 * 1. Object.defineProperty对data实现的数据劫持, dep闭包维护依赖关系
 * 2. 
 * 
 * 三. v-model的原理
 * 1. 编译模板时识别到directives, 不同的标签由不同的事件触发, 不同的事件有不同的返回值, 把事件触发后的返回值设置给vm.value
 * 2. genDefaultModel(el, value, modifiers) {
        addHandler(el, eventName, "value = handlerString")
 *    }
 * 3. 当用户触发对应的事件的时候会触发handleString, 在handleString中会修改绑定的数据
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