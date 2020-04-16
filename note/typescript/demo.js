var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var getCacheData = function (key) {
    return window.cache[key];
};
var ben = getCacheData('ben');
ben.run();
;
var color = [Color.Red, Color.Green, Color.Blue];
console.log(color);
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
        this.name = name;
    }
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    Cat.prototype.run = function () { };
    return Cat;
}(Animal));
var PlaneDoor = /** @class */ (function () {
    function PlaneDoor() {
    }
    return PlaneDoor;
}());
var Plane = /** @class */ (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plane.prototype.alert = function () { console.log(123); };
    return Plane;
}(PlaneDoor));
var test = [1, 2, 3, [4, 5, 6]];


/////////////////////////////////////////////////////////
// 1. 原型链
function Parent(){
    this.names = ['a', 'b', 'c']
}

Parent.prototype.getNames = function () {
    return this.names
}

function Child(name){
    this.name = name
}

Child.prototype = new Parent()

Child.prototype.getNameIndex = function(){
    return this.names.findIndex(v => v === this.name)
}



// 构造函数
function Parent(sex) {
    this.sex = sex
    this.names = ['a', 'b', 'c']
}

Parent.prototype.getNames = function () {
    return this.names
}

function Child(name, age) {
    this.name = name
    Parent.call(this, age)
}

Child.prototype.getNameIndex = function () {
    return this.names.findIndex(v => v === this.name)
}


// 组合继承
function Parent(sex) {
    this.sex = sex
    this.names = ['a', 'b', 'c']
}

Parent.prototype.getNames = function () {
    return this.names
}

function Child(name, age) {
    this.name = name
    Parent.call(this, age)
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

Child.prototype.getNameIndex = function () {
    return this.names.findIndex(v => v === this.name)
}


// 原型式

function createObj(o) {
    function F(){}
    F.prototype = o
    return new F()
}

Object.create(o.prototype)
// 寄生式

function createObj(o) {
    var clone = Object.create(o)
    clone.sayName = function(){
        return this.name
    }
    return clone
}

// 寄生组合式

Child.prototype = Object.create(Parent.prototype)