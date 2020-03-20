Function.prototype.call = function(context, ...args){
    if (typeof this != "function") throw new TypeError("call must be called on a function")
    context = context || window
    context.func = this
    let res = context.func(...args)
    delete context.func
    return res
}


Function.prototype.apply = function(context, args){
    if (typeof this != "function") throw new TypeError("apply must be called on a function")
    context = context || window
    context.func = this
    let res = context.func(...args)
    delete context.func
    return res
}


Function.prototype.bind = function (context, ...bindArgs){
    if (typeof this != "function") throw new TypeError("bind must be called on a function")
    let func = this
    return function newFn(...callArgs){
        let args = bindArgs.concat(callArgs)
        // 要考虑构造函数的情况!!!
        if (this instanceof newFn){  // 意味着是通过 new 调用, 以 newFn 为构造函数
            // 通过 new 的优先级高于 bind
            return new func(...args)
        }
        return func.call(context, ...args)
    }
}


// 测试
function test(name, age){
    console.log(`name is ${this.name}, age is ${this.age}, arg:`, name, age)
    this.name = name
    this.age = age
}

let person = {name: "ben", age: 28}
let a = test.call(person, 'a', 9)
let b = test.apply(person, ['b', 8])
let c = test.bind(person, 'c')
c(7)
let d = new c(6)