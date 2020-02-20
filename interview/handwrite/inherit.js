function Foo(name) {
    this.name = name
}
Foo.prototype.myName = function(){ return this.name }

// ES6之前
// 寄生组合式继承
// 1. 继承方法
function inherit(func, parentFunc){
    func.prototype = object(parentFunc.prototype) // 基于父类的原型对象创建一个新对象作为子类的原型对象
    func.prototype.constructor = func // 修复子类原型对象的constructor
    function object(o) {
        //return Object.create(o)  // 如果属于ES5的方法: Object.create 存在时, 可以直接使用它
        function F(){}
        F.prototype = o
        return new F()
    }
}
function Bar(name, label) {
    // 2. 继承属性
    Foo.call(this, name)
    this.label = label
}
Bar.prototype.myLable = function(){ return this.label }

let a = new Bar("ben", "I'am label!")
a.myName()      // "ben"
a.myLabel()     // "I'am label!"


// ES6之后
// 使用class语法糖
class Baz extends Foo{
    constructor(name, label){
        super(name)
        this.label = label
    }
    
    myLable() { return this.label }
}



// 测试
let bar = new Bar('bar', 'ES5') // Bar {name: "bar", label: "ES5"}
let baz = new Baz('baz', 'ES6') // Baz {name: "baz", label: "ES6"}
