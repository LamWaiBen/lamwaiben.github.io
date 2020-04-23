
const { Dep, pushTarget, popTarget } = require('./Dep')

/**
 * Wathcher 
 * 避免重复依赖
 */

class Watcher {
    constructor(data, expOrFn, cb, options, isRenderWatcher) {

        this.vm = data
        this.cb = cb

        this.deps = []
        this.newDeps = []
        this.depIds = new Set()
        this.newDepIds = new Set()


        if (options) {
            this.deep = !!options.deep
            this.computed = !!options.computed
            this.before = options.before
        } else {
            this.deep = this.user = this.computed = this.sync = false
        }
        this.dirty = this.computed

        if (isRenderWatcher) {
            this.vm._watcher = this
        }


        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else if (/\./.test(expOrFn)) {
            this.getter = (vm) => {
                let v = vm
                for (let key of expOrFn.split('.')) {
                    v = v[key]
                }
            }
        } else {
            this.getter = vm => vm[expOrFn]
        }

        if (this.computed) {
            this.value = undefined
            this.dep = new Dep()
        } else {
            this.value = this.get()
        }

    }

    get() {
        // 触发 getter 收集依赖
        pushTarget(this)
        const vm = this.vm
        let value = this.getter.call(vm, vm)

        if (this.deep) {

        }

        popTarget()
        this.cleanupDeps()
        return value
    }


    addDep(dep) {
        let id = dep.id
        // 避免重复依赖
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)           // newDepIds 属性用来在一次求值中避免收集重复的观察者
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {      // depIds 属性用来避免重复求值时收集重复的观察者
                dep.addSub(this)
            }
        }
    }

    cleanupDeps() {
        let i = this.deps.length
        while (i--) {
            // 清除那些dep和watcher不存在依赖关系的实例
            const dep = this.deps[i]
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this)
            }
        }

        let tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }

    update() {
        if (this.computed) {

        } else {
            queueWatcher(this)
        }
    }

    // 收集计算属性的依赖
    depend() {
        if (this.dep && Dep.target) {
            this.dep.depend()
        }
    }

    // 触发计算属性
    evaluate() {
        if (this.dirty) {
            this.value = this.get()
            this.dirty = false
        }
        return this.value
    }


    run() {

    }
}

function $watch(data, expOrFn, cb) {
    new Watcher(data, expOrFn, cb)
}


function queueWatcher(watcher) {
    watcher.cb()
}



module.exports = { Watcher, $watch }