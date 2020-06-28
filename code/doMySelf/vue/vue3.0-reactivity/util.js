const util = {
    isObject(v) {
        return v && typeof v === 'object'
    },

    isArray(v){
        return Array.isArray(v)
    },

    isFunction(v){
        return typeof v === 'function'
    },

    def(data, k, v) {
        Object.defineProperty(data, k, {
            enumerable: false,
            configurable: true,
            value: v
        })
    },

    hasOwn(data, k) {
        return Object.getOwnPropertyNames(data).includes(k)
    },

    isCollection(v){
        if(!v) false
        return [Set, Map, WeakSet, WeakMap].includes(v.constructor)
    },
}

module.exports = util;