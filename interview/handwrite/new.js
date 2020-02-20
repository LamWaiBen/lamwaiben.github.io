function _new(func, ...args) {
    if(typeof func != 'function') throw new Error("参数必须是一个函数")
    let obj = Object.create(func.prototype)
    let res = func.call(obj, ...args)
    // 根据 new 的行为, 需要对构造函数调用后的返回值判断, 
    // 如果结果是对象或者函数时, 则不会正常返回新建对象
    if(res !== null && (typeof res === 'object' || typeof res === 'function')){
        return res
    }
    return obj
}

// 测试
function Test (a){
    this.a = a
}
console.log(_new(Test, '1'))  // Test {a: "1"}