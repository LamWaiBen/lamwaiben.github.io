# ES7
记录平时遇到的ES7语法

## Array.prototype.includes
```javascript
var arr = [1, 2, 3, 4, 5]
arr.includes(4) // true
```

## 装饰器 Decorators
```javascript

/////////////////// 装饰器行为如下: ////////////////////////////
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;


// 使用方法: @ + functionName
///////////////////// 装饰类 ///////////////////
@testable
class MyTestTableClass {
    // ...
}

function testable(target) {
    target.isTestable = true
}

MyTestTableClass.isTestable // true


///////////////////// 装饰类的方法 ////////////////////////
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}

function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);

```