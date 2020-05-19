/**
 * 依赖
 */

class Dep{
    static Target = null
    constructor(){
        this.subs = [] // [Watcher]
    }

    // Observer 触发, 使watcher收集到闭包 dep
    depend(){
        if(Dep.Target) {
            Dep.Target.addDep(this)

            Dep.Target = null
        }
    }

    // watcher 触发, 把自己传给劫持者的dep
    addSub(sub) {
        this.subs.push(sub)
    }

    // Observer 触发, 通知watcher更新回调
    notify(){
        this.subs.forEach(watcher => watcher.update())
    }
}


module.export = Dep;