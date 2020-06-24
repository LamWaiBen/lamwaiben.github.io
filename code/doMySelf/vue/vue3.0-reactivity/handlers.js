const { track, trigger, TrackOpTypes, TriggerOpTypes, ITERATE_KEY } = require("./effect.js");
const { hasOwn } = require("./util");

const arrayTrackMethod = ["includes", "indexOf", "lastIndexOf"];
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        const targetIsArray = Array.isArray(target);
        if (targetIsArray && arrayTrackMethod.includes(key)) {
            // todo handler method ['includes', 'indexOf', 'lastIndexOf']
        }
        const result = Reflect.get(target, key, receiver);
        track(target, TrackOpTypes.GET, key);

        return result;
    };
}

function createSetter(shallow) {
    return function set(target, key, value, receiver) {
        const oldVal = target[key];
        const result = Reflect.set(target, key, value, receiver);
        trigger(target, TriggerOpTypes.SET, key, value, oldVal);
        return result;
    };
}

function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldVal = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
        trigger(target, TriggerOpTypes.DELETE, key, undefined, oldVal);
    }
    return result;
}

function has(target, key) {
    const result = Reflect.has(target, key);
    track(target, TrackOpTypes.HAS, key);
    return result;
}

function ownKey(target) {
    const result = Reflect.ownKeys(target);
    track(target, TrackOpTypes.ITERATE, ITERATE_KEY);
    return result;
}

const mutableHandlers = {
    get: createGetter(),
    set: createSetter(),
};

const readonlyHandlers = {
    get: createGetter(true),
    set: createSetter(),
};

const shallowReactiveHandlers = {
    get: createGetter(false, true),
    set: createSetter(true),
};
const shallowReadonlyHandlers = {
    get: createGetter(true, true),
    set: createSetter(true),
};

// todo collections handler
// map/set: mutableCollectionHandlers, readonly..., shallow....
module.exports = { mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers };
