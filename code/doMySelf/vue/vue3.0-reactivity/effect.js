const targetMap = new Map();
let activeEffect = null;
let effectStack = []
let uid = 0;

const TrackOpTypes = {
    GET: 'get',
    HAS: 'has',
    ITERATE: 'iterate'
}
function track(target, type ,key) {
    if(!activeEffect) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key)
    if(!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    
    if(!dep.has(activeEffect)) {
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }
}


const TriggerOpTypes = {
    SET: 'set',
    GET: 'get', 
    DELETE: 'delete',
    CLEAR: 'clear',
}
function trigger(target, type, key, newVal, oldVal, oldTarget) {
    const depsMap = targetMap.get(target)
    if(!depsMap) return 

    const computedRunners = new Set()
    const effects = new Set()

    const add = effectToAdd => {
        if(effectToAdd) {
            effectToAdd.forEach(effect => {
                if(effect != activeEffect) {
                    if(effect.options.computed) {
                        computedRunners.add(effect)
                    } else {
                        effects.add(effect)
                    }
                }
            })
        }
    }
    
    if(type === TriggerOpTypes.CLEAR){
        // 清空类型的trigger, 对对象全部key都触发
        depsMap.forEach(add)
    } else if(key === 'length' && Array.isArray(target)) {
        // key为长度, 且target为数组
        depsMap.forEach((dep, key) => {
            if(key === 'length' || key >= newVal){
                // 当依赖key target.key 为长度, 或依赖项比新长度大时, 触发
                add(dep)
            }
        })
    } else {
        if(key !== void 0) {
            add(depsMap.get(key))
        }

        // todo 处理 map 的 add, delete , set
    }

    const run = effect => {
        if(effect.options.scheduler){
            effect.options.scheduler(effect)
        } else {
            effect()
        }
    }

    computedRunners.forEach(run)
    effects.forEach(run)
}

function effect(fn, options = {}){
    const effect = createReactiveEffect(fn, options)
    if(!options.lazy){
        effect()
    }
    return effect
}
function createReactiveEffect(fn, options) {
    const effect = function(...args){
        try {
            activeEffect = effect
            effectStack.push(effect)
            return fn(...args)
        } finally {
            effectStack.pop()
            activeEffect = effectStack[effectStack.length - 1]
        }
    }

    effect.uid = uid++
    effect.active = true
    effect.options = options
    effect.deps = []

    return effect;
}

function stop(effect){
    if(effect.active){
        effect.active = false
    }
}

module.exports = { effect, stop, track, trigger, TrackOpTypes, TriggerOpTypes }