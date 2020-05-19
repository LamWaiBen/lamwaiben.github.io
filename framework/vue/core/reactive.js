/**
 * Vue3.0的响应式  TODO
 */

function reactive(obj) {
    const proxy = new Proxy(obj, {
        get(target, p, receiver) {
            Dep.append()
            return Reflect.get(target, p, receiver)
        },
        set(target, p, v, receiver) {
            Dep.notify()
            return Reflect.set(target, p, v, receiver)
        }
    })

    return proxy
}