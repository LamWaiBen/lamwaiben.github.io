/**
 * 深拷贝
 * 1. 支持的类型: 
 * undefined, 
 * null, 
 * string, 
 * number(NaN), 
 * boolean, 
 * symbol, 
 * Object: (包含以下:
 *      object, array, date, RegExp, function, 
 *      set, map, weakSet, weakMap, 
 *      arguments, Error, 基本类型实例(string, number, boolean)))
 * 
 * bigint, ES9
 * 
 * 
 * 2. 分为3类处理: 基本类型, 不可遍历的对象,  可遍历的对象
 * 
 * 3. 支持自建类型的原型
 * 
 * 4. 考虑对象循环引用
 * 
 * 5. 不考虑兼容被元编程修改过的对象. Symbol[Interor]
 * 
 */

function deepClone(target, weakMap = new WeakMap()) {
    // 1. 基本类型
    if (!isObject(target)) return target

    let cloneTarget;
    let targetType = getObjectType(target)

    // 处理对象的循环引用
    if (weakMap.has(target)) return weakMap.get(target)

    if (notTraverseHandle[targetType]) {
        // 2. 不可遍历对象
        cloneTarget = notTraverseHandle[targetType](target, targetType)

        // 设置对象到hash上
        weakMap.set(target, cloneTarget)
    } else {
        // 3. 可遍历的对象
        cloneTarget = handleTraverse(target, targetType, weakMap)
    }

    return cloneTarget;
}

// 两种判断方式
function isObject(target) {
    return target instanceof Object

    return target !== null && (typeof target === 'object' || typeof target === 'function')
}

function getObjectType(target) {
    return Object.prototype.toString.call(target)
}


// 可以遍历的对象
const canTraverseObject = {
    '[object Object]': handleTraverse,
    '[object Array]': handleTraverse,
    '[object Set]': handleTraverse,
    '[object Map]': handleTraverse,
    '[object WeakSet]': handleTraverse,
    '[object WeakMap]': handleTraverse,
    '[object Arguments]': handleTraverse,
}

// 不可以遍历的对象
const notTraverseHandle = {
    '[object String]': handleNotTraverse,
    '[object Number]': handleNotTraverse,
    '[object Boolean]': handleNotTraverse,
    '[object Symbol]': handleNotTraverse,
    '[object Date]': handleNotTraverse,
    '[object RegExp]': handleNotTraverse,
    '[object Function]': handleNotTraverse,
    '[object Error]': handleNotTraverse,
}



function handleNotTraverse(target, targetType) {
    let ctor = target.constructor
    switch (targetType) {
        case '[object String]':
        case '[object Number]':
        case '[object Boolean]':
        case '[object Symbol]':
            return new Object(Object.prototype.valueOf.call(target)) // 不继承原型        
        case '[object Date]':
        case '[object Error]':
            return new ctor(target)     // 继承原型的写法
        case '[object RegExp]':
            return new ctor(target.source, target.flags)
        case '[object Function]':
            return handleFunc(target)
        default:
            return new ctor(target)
    }
}

function handleFunc(func) {
    const funcString = func.toString()
    if (func.prototype) {
        // 非箭头函数
        const bodyReg = /(?<={)(.|\n)+(?=})/m
        const paramReg = /(?<=\().+(?=\)\s+{)/
        const param = paramReg.exec(funcString)
        const body = bodyReg.exec(funcString)
        if (body) {
            if (param) {
                const paramArr = param[0].split(',')
                return new Function(...paramArr, body[0])
            } else {
                return new Function(body[0])
            }
        }
    }

    return eval ? eval(funcString) : func
}


function handleTraverse(target, targetType, weakMap) {
    let ctor = target.constructor
    let cloneTarget = new ctor()
    weakMap.set(target, cloneTarget)

    switch (targetType) {
        case '[object Set]':
        case '[object WeakSet]':
            target.forEach(v => {
                cloneTarget.add(deepClone(v, weakMap))
            })
            break;
        case '[object Map]':
        case '[object WeakMap]':
            target.forEach((v, k) => {
                cloneTarget.set(deepClone(k, weakMap), deepClone(v, weakMap))
            })
            break
        default:
            break;
    }

    // Object, Array, Arguments
    for (let k in target) {
        cloneTarget[k] = deepClone(target[k], weakMap)
    }

    return cloneTarget
}



// 测试用例
var a = {
    a: 1,
    b: 'b',
    c: true,
    d: [1,2,3],
    e: { a },
    f: new Set([1,2,3]),
    g: new Map([[a, 1], [{}, ()=>{console.log('clone')}]])
}
a.e = a

var b = deepClone(a)
console.log(a, b)