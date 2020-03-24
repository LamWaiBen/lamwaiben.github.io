"use strict";
/**
 * 基础类型
 * boolena, string, number, Array, 元组Tuple, 枚举 enum, Any,
 * void, null和undefined, never, object
 *
 */
exports.__esModule = true;
// 数组类型
// 第一种方式: 类型+方括号
var list = [1];
// 第二种方式: 数组泛型
var list2 = [2];
// 第四种方式: 类数组
function _fn1() {
    var args = arguments;
}
// 元组 Tuple    联合类型
var x = ['key', 2, 3];
// x[0].substr(1)  // OK
// x[1].substr(1)  // Error, 'number' does not have 'substr'
x[2] = '333';
x[2] = 333;
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var Red = Color.Red;
var colorName = Color[2];
// null undefined
var n = null;
var test = 123;
test = n;
// void  null与undefined为void的子集
function warn(params) {
    // return null              // ok
    // return undefined         // ok
}
// never 永不存在 不可赋值
function error() {
    throw "";
}
create({}); // OK
create(null); // OK
// create(42); // Error
// 函数
// 函数声明方式,  默认值
function sum_fn1(x, y, z) {
    if (z === void 0) { z = 0; }
    return x + y + z;
}
// 函数表达式方式, 剩余参数
var sum_fn2 = function (x, y) {
    var items = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        items[_i - 2] = arguments[_i];
    }
    var sum = x + y;
    for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
        var v = items_1[_a];
        sum += v;
    }
    return sum;
};
var mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
function reverse(x) {
    if (typeof x == 'number') {
        return Number(x.toString().split('').reverse().join());
    }
    else if (typeof x == 'string') {
        return x.split('').reverse().join('');
    }
    return "";
}
// 类型断言  把某个值断定是某个类型(必须是联合类型中存在的类型)
var someValue = "it's string";
var strLength = someValue.length; // 尖括号语法
var strLength_ = someValue.length; // as
function getLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
function greeter1(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user2 = { id: 1, firstName: "Jane", lastName: "User", age: 9 };
document.body.innerHTML = greeter1(user2);
// 类
var Student = /** @class */ (function () {
    function Student(firstName, midName, lastName) {
        this.firstName = firstName;
        this.midName = midName;
        this.lastName = lastName;
        this.fullName = firstName + " " + midName + " " + lastName;
    }
    return Student;
}());
var student = new Student('A', "B", "C");
function greeter2(person) {
    return "Hello, " + person.firstName;
}
greeter2(student);
exports.moment = {
    CalendarKey: function () { }
};
