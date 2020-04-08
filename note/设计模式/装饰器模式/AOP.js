// 使用AOP装饰函数 实现装饰器模式
Function.prototype.before = function (beforeFn) {
    let self = this;
    return function () {
        beforeFn.apply(this, arguments);
        return self.apply(this, arguments);
    };
}

Function.prototype.after = function (afterFn) {
    let self = this;
    return function () {
        self.apply(this, arguments)
        return afterFn.apply(this, arguments)
    }
}


// test
var name = 'windows'
function foo(num) {
    console.log('foo num:', num, this.name)
}

function beforeFn(arg) {
    console.log('beforeFn', arg, this.name)
}

function afterFn(arg) {
    console.log('afterFn', arg, this.name)
}

foo = foo.before(beforeFn).after(afterFn)

foo(1)
// beforeFn, windows
// foo num: 1
// afterFn, windows


var a = {
    name: 'a',
    foo,
}

a.foo(2)
// beforeFn, a
// foo num: 2
// afterFn, a
