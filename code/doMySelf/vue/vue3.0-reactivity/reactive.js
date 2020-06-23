const { isObject, def, hasOwn, isCollection } = require("./util");

const { mutableHandlers } = require('./handlers')


const REACTIVE_FLAGS = {
    reactive: "__v_reactive",
    readonly: "__v_readonly",
    raw: "__v_raw",
};

function createReactive(target, isReadonly, baseHandlers, collectionHandlers) {
    // 1. check target isObject..
    if (!isObject(target)) return target;

    // 2. check flag
    if (hasOwn(target, isReadonly ? REACTIVE_FLAGS.readonly : REACTIVE_FLAGS.reactive)) {
        return isReadonly ? target.__v_readonly : target.__v_reactive;
    }

    // 3. check canObservable
    if (Object.isFrozen(target)) return target;
    const observed = new Proxy(target, isCollection(target) ? collectionHandlers : baseHandlers);
    def(target, isReadonly ? REACTIVE_FLAGS.readonly : REACTIVE_FLAGS.reactive, observed)
    return observed;
}


const reactive = function (target) {
    return createReactive(target, false, mutableHandlers)
};

const ref = function (value) {};

const readonly = function (value) {};

module.exports = { reactive, ref, readonly };
