const { track, trigger, TrackOpTypes, TriggerOpTypes } = require('./effect.js')

const arrayTrackMethod = ['includes', 'indexOf', 'lastIndexOf']
function createGetter(isReadonly = false, shallow = false){
    return function get(target, key, receiver) {
        const targetIsArray = Array.isArray(target)
        if(targetIsArray && arrayTrackMethod.includes(key)){
            // todo handler method ['includes', 'indexOf', 'lastIndexOf']
        }
        const result = Reflect.get(target, key, receiver)
        track(target, TrackOpTypes.GET, key)

        return result
    }
}

function createSetter(shallow){
    return function set(target, key, value, receiver) {
        const oldVal = target[key]
        const result = Reflect.set(target, key, value, receiver)
        trigger(target, TriggerOpTypes.SET, key, value, oldVal)
        return result
    }
}

const mutableHandlers = {
    get: createGetter(),
    set: createSetter(),
};

const readonlyHandlers = {
    get: createGetter(true),
    set: createSetter(),
}

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