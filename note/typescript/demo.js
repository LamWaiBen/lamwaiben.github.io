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
var createArray_;
createArray_ = function (length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
};
createArray_(3, 'x'); // ['x', 'x', 'x']
var arr;
arr = {
    1: new Cat('1'),
    2: new Cat('1')
};
var a = arr[1];
var b = arr["1"];
var sem = { name: 'sem', age: 26 };
