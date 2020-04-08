// 使用AOP装饰函数 实现装饰器模式
//
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
// beforeFn 1 windows
// foo num: 1 windows
// afterFn 1 windows

var a = {
    name: 'a',
    foo,
}
a.foo(2)
// beforeFn 2 a
// foo num: 2 a
// afterFn 2 a