# ES7
记录平时遇到的ES7语法

## Array.prototype.includes
```javascript
var arr = [1, 2, 3, 4, 5]
arr.includes(4) // true
```

## 装饰器 Decorators
```javascript
// 使用方法: @ + functionName
@testable
class MyTestTableClass {
    // ...
}

function testable(target) {
    target.isTestable = true
}

MyTestTableClass.isTestable // true


// 装饰器行为如下:
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;


```