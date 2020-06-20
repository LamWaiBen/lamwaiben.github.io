
let uid = 1;
class Dep {
    static target
    constructor() {
        this.id = uid++

        this.subs = []      // watchers
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    notify() {
        let subs = this.subs.slice()
        for(let sub of subs){
            sub.update()        // 通知观察者更新
        }
    }


    addSub(sub){
        this.subs.push(sub)
    }

    removeSub(sub) {
        this.subs = this.subs.filter(v => v != sub)
    }
}

const targetStack = []
function pushTarget(target){
    if(Dep.target) targetStack.push(Dep.target)
    Dep.target = target
}

function popTarget(){
    Dep.target = targetStack.pop()
}

module.exports = { Dep, pushTarget, popTarget };