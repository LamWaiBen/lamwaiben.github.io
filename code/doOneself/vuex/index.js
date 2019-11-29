// 遍历对象工具函数, 函数内部遍历callback(key, value)
const myforEach = (obj, callback) => Object.keys(obj).forEach(key => callback(key, obj[key]))

let Vue = null
class Store {
    constructor(options) {
        let { state, getter, actions, mutations } = options
        this.getter = {}
        this.actions = {}
        this.mutations = {}

        // 底层实际上也是一个vue, state数据变成响应式
        this._vm = new Vue({
            data: {
                state
            }
        })

        myforEach(getter, (key, getterFn) => {
            // 遍历getter, 给this.getter的属性设置get方法
            Object.defineProperty(this.getter, key, {
                get: () => getterFn(state)
            })
        })
        
        myforEach(actions, (key, method) => {
            this.actions[key] = () => method.call(this, this)
        })

        myforEach(mutations, (key, method) => {
            this.mutations[key] = () => method.call(this, state)
        })

        // 由于所有view组件上都存在this.$store对象, 而且可以调用commit与dispatch方法, 所以需要对着两个方法绑定this
        this.dispatch = this.dispatch.bind(this)
        this.commit = this.dispatch.bind(this)

    }

    get state () { return this._vm.state }
    
    // view -> dispatch -> action -> commit -> store -> view
    dispatch(actionName) {
        this.actions[actionName]()
    }

    commit(methodName) {
        this.mutations[methodName]()
    }
}


// Vue.use(Vuex) 中会调用install方法
const install = _Vue => {
    if(Vue === _Vue) return
    Vue = _Vue

    // mixin: 混合钩子函数
    Vue.mixin({
        beforeCreate () {
            if (this.$option && this.$option.store) {
                // 根节点上设置 this.$store
                this.$store = this.$options.store
            } else if (this.$parent && this.$parent.$store) {
                // 子节点逐层传递$store
                this.$store = this.$parent.store
            }
        }
    })
}


module.exports = { install, Store }


/**
 * 用法:
 * 
 */

 // Vue.use(Vuex)
const store = new Store({
    state: {
        count: 100
    },
    getter: {
        newCount (state) {
            return state.count + 100
        }
    },

    actions: {
        change (store) {
            setTimeout(() => {
                store.commit("change")
            }, 1000)
        }
    },

    mutations: {
        change (state) {
            state.count += 10
        }
    }
})