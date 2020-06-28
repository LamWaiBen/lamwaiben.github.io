/**
 * 利用 effect 实现的其他api
 * 1. computed
 * 2. watch
 * 3. watchEffect
 */

import { effect, stop, trigger, TriggerOpTypes, track, TrackOpTypes } from "./effect";
import { isReactive, isRef } from "./reactive";
import { isObject, isFunction, isArray } from "./util";

// 1. computed
export function computed(getterOrOptions) {
    let getter = null;
    let setter = null;
    if (typeof getterOrOptions === "function") {
        getter = getterOrOptions;
    } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }

    let dirty = true;
    let value = null;
    let computed = null;

    const runner = effect(getter, {
        lazy: true,
        computed: true,
        scheduler() {
            if (!dirty) {
                dirty = true;
                trigger(computed, TriggerOpTypes.SET, "value");
            }
        },
    });

    computed = {
        __v_isRef: true,
        effect: runner, // 暴露effect, 使computed支持stop
        get value() {
            if (dirty) {
                value = runner();
                dirty = false;
            }
            track(computed, TrackOpTypes.GET, "value");
            return value;
        },
        set value(newValue) {
            setter && setter(newValue);
        },
    };
}

// watch相关

function doWatch(source, cb, options) {
    // 根据source的类型, 创建getter函数 用于收集依赖
    let getter = () => {};
    if (isArray(source)) {
        getter = () => {
            source.map((s) => {
                if (isRef(s)) {
                    return s.value;
                } else if (isReactive(s)) {
                    return traverse(s);
                }
            });
        };
    } else if (isRef(source)) {
        getter = () => source.value;
    } else if (isReactive(source)) {
        getter = () => source;
        options.deep = true;
    } else if (isFunction(source)) {
        // 错误提示
        if (cb) {
            // getter with cb
            getter = () => {
                try {
                    source();
                } catch (error) {
                    console.error("doWatch error:", error);
                }
            };
        } else {
            // no cb -> simple effect
            getter = () => {
                // todo check life cycle
                if (cleanup) {
                    cleanup();
                }
                return source(onInvalidate);
            };
        }
    } else {
        getter = () => {};
    }

    let cleanup;
    const onInvalidate = (fn) => {
        // 失效时会执行 fn
        cleanup = runner.options.onStop = () => {
            fn();
        };
    };

    if (cb && options.deep) {
        const baseGetter = getter;
        getter = () => traverse(baseGetter());
    }

    let scheduler = () => {};
    if (!options.flush || options.flush === "sync") {
        scheduler = (fn) => fn();
    } else if (options.flush === "pre") {
        scheduler = (fn) => setTimeout(fn, 0);
    }

    let oldValue = isArray(source) ? [] : {};
    const applyCb = cb
        ? () => {
              try {
                  const newValue = runner();
                  if (options.deep || newValue != oldValue) {
                      // cleanup before running cb again
                      if (cleanup) {
                          cleanup();
                      }
                      cb(newValue, oldValue, onInvalidate);
                  }
              } catch (error) {}
          }
        : void 0;

    const runner = effect(getter, {
        lazy: true,
        computed: true,
        onTrack: options.onTrack,
        onTrigger: options.onTrigger,
        scheduler: applyCb ? () => scheduler(applyCb) : scheduler,
    });

    if (applyCb) {
        if (options.immediate) {
            applyCb();
        } else {
            oldValue = runner();
        }
    } else {
        runner();
    }

    // 返回可以停止effect的函数
    return () => {
        stop(runner);
        // todo remove instance effects
    };
}

function traverse(value, seen = new Set()) {
    // seen: 避免重复遍历
    if (!isObject(value) || seen.has(value)) {
        return value;
    }
    seen.add(value);

    if (isArray(value)) {
        for (let v of value) {
            traverse(v, seen);
        }
    } else if (value instanceof Map) {
        value.forEach((v, key) => {
            traverse(value.get(key), seen);
        });
    } else if (value instanceof Set) {
        value.forEach((v) => {
            traverse(v, seen);
        });
    } else {
        for (let key in value) {
            traverse(value[key], seen);
        }
    }
    return seen;
}

// 2. watch, watch与watchEffect的区别在于
// 2.1 source支持多种类型
// 2.2 有cb回调函数, 而watchEffect没有
export function watch(source, cb, options) {
    return doWatch(source, cb, options);
}

// 3. watchEffect, 与effect类似, 有下列不同:
// 3.1 声明的时候立刻执行一次
// 3.2 组件卸载时, 会被自动stop
// 3.3 effect(onInvalidate) onInvalidate函数会在副作用无效时执行, 避免出现竞态问题
// watchEffect(async (onInvalidate) => {
//     let validate = true
//     onInvalidate(() => {
//         validate = false
//     })
//     const data = await fetch(obj.foo)
//     if(validate){
//         /* 正常使用data */
//     } else {
//         /* 说明当前副作用已无效, 需要抛弃data */
//     }
// })
export function watchEffect(effect, options) {
    return doWatch(effect, null, options);
}
