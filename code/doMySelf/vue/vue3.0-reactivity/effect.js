const targetMap = new Map();
let activeEffect = null;
let effectStack = [];
let uid = 0;

const TrackOpTypes = {
    GET: "get",
    HAS: "has",
    ITERATE: "iterate",
};
const TriggerOpTypes = {
    SET: "set",
    GET: "get",
    DELETE: "delete",
    CLEAR: "clear",
};

const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("map key iterate");

// 维护一个栈, 控制是否需要收集/触发依赖
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}
function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
}
function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === undefined ? true : last;
}

function track(target, type, key) {
    if (!activeEffect || !shouldTrack) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    // 某个对象某个key的依赖
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }

    // 互相收集依赖
    // 1. targetMap 中记录对 target[key] 有依赖的 effect
    // 2. effect 中记录 target[key] 所收集到的 effects
    if (!dep.has(activeEffect)) {
        // dep收集effect
        dep.add(activeEffect);
        // effect收集函数内部所有响应式对象的某个key的所有依赖effect
        // 供 cleanup使用
        activeEffect.deps.push(dep);
    }
}

function trigger(target, type, key, newVal, oldVal, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;

    const computedRunners = new Set();
    const effects = new Set();

    const add = (effectToAdd) => {
        if (effectToAdd) {
            effectToAdd.forEach((effect) => {
                // 如果在 activeEffect 中修改reactive对象, 则不会触发effect
                if (effect != activeEffect || !shouldTrack) {
                    if (effect.options.computed) {
                        computedRunners.add(effect);
                    } else {
                        effects.add(effect);
                    }
                }
            });
        }
    };

    if (type === TriggerOpTypes.CLEAR) {
        // 清空类型的trigger, 对对象全部key都触发
        depsMap.forEach(add);
    } else if (key === "length" && Array.isArray(target)) {
        // key为长度, 且target为数组
        depsMap.forEach((dep, key) => {
            if (key === "length" || key >= newVal) {
                // 当依赖key target.key 为长度, 或依赖项比新长度大时, 触发
                add(dep);
            }
        });
    } else {
        if (key !== void 0) {
            add(depsMap.get(key));
        }

        // todo 处理 map 的 add, delete , set
    }

    // effect的执行顺序
    // 1. options.onTrigger
    // 2. options.scheduler
    // 3. effect

    const run = (effect) => {
        if (effect.options.scheduler) {
            effect.options.scheduler(effect);
        } else {
            effect();
        }
    };

    computedRunners.forEach(run);
    effects.forEach(run);
}

function effect(fn, options = {}) {
    if (fn.isEffect) {
        fn = fn.raw;
    }
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect();
    }
    return effect;
}
function createReactiveEffect(fn, options) {
    const effect = function (...args) {
        // 避免重复收集effect(嵌套等情况)
        if (!effectStack.includes(effect)) {
            cleanup(effect);
            try {
                enableTracking();
                activeEffect = effect;
                effectStack.push(effect);
                return fn(...args);
            } finally {
                effectStack.pop();
                resetTracking();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };

    effect.uid = uid++;
    effect.raw = fn;
    effect.isEffect = true;
    effect.active = true;
    effect.options = options;
    effect.deps = []; // 记录当前effect 收集到的依赖
    return effect;
}

// stop并不会删掉effect, 只是会把它的 deps清空, active设为false,
function stop(effect) {
    if (effect.active) {
        cleanup(effect);
        if (effect.options.onStop) {
            effect.options.onStop();
        }
        effect.active = false;
    }
}

function cleanup(effect) {
    const { deps } = effect;
    for (let i = 0; i < deps.length; i++) {
        // 1. 把从 track 中记录的 deps 删除当前失效的effect, 避免内存泄露
        deps[i].delete(effect);
    }
    // 2. 然后把所有记录的依赖清空
    deps.length = 0;
}

module.exports = {
    effect,
    stop,
    track,
    trigger,
    TrackOpTypes,
    TriggerOpTypes,
    ITERATE_KEY,
    MAP_KEY_ITERATE_KEY,
};
