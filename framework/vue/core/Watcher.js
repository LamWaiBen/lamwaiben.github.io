const Dep = require('./Dep.js')
class Watcher {
    constructor(vm, expOrFn, cb) {
        Dep.Target = cb     // 这里赋值Dep.Target, 然后触发表达式, 实现依赖收集
        this.dep = new Dep()
        this.vm = vm

        this.sync = true

        this.getter = function (vm) {
            if (typeof expOrFn === 'function') {
                return expOrFn.call(vm)
            } else if (/\./.test(expOrFn)) {
                // 获取对象的深度属性
                let keys = expOrFn.split('.')
                let obj = vm
                for (let key of keys) {
                    obj = obj[key]
                }
                return obj
            }
        }
        this.get()
    }

    get(){
        // Dep.pushTarget(this)
        const vm = this.vm
        let value = this.getter.call(vm, vm)


         // Dep.popTarget(this)
        return value
    }

    addDep(dep){
        // 把自己订阅给 Observer 的dep
        dep.addSub(this)
    }

    update(){
        if(this.sync) {
            this.run()
        } else {
            this.queue()
        }
    }

    run() {
        let oldValue = this.value
        this.value = this.get()
        this.cb.call(vm, this.value, oldValue)
    }

    queue(){
        // $nextTick trigger update
        setTimeout(() => {
            this.run()
        })
    }
}


module.export = Watcher