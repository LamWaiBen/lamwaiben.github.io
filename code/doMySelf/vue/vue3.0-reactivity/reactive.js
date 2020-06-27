const { isObject, def, hasOwn, isCollection } = require("./util");

const { mutableHandlers } = require('./handlers');
const { track, trigger } = require("./reactivity.cjs");
const { TrackOpTypes, TriggerOpTypes } = require("./effect");


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

const ref = function (value) {
    if(isRef(value)) {
        return value
    }
    if(isObject(value)) {
        return value
    }

    const ref = {
        __v_isRef: true,
        get value(){

            track(ref, TrackOpTypes.GET, 'value')
            return value
        },
        set value(newValue) {
            if(newValue != value) {
                value = newValue
                trigger(ref, TriggerOpTypes.SET, 'value', newValue)
            }

        }
    }

    return ref
};

const readonly = function (value) {};

const isRef = function(target) {
    return target.__v_isRef
}

module.exports = { reactive, ref, readonly, isRef };
