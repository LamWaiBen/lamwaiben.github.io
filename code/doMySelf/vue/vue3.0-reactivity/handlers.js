function createGetter(isReadonly = false, shallow = false){
    return function get(target, key, receiver) {
        const targetIsArray = Array.isArray(target)
        if(targetIsArray){
            // todo handler method ['includes', 'indexOf', 'lastIndexOf']
            
        }


    }
}

function createSetter(shallow){

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
module.export = { mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers };