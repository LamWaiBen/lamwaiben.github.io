# 自己实现Promise

## 分析
自己动手实现一个promise
要求: 符合Promise/A+规范.   
什么是Promise/A+规范? [参考](http://www.ituring.com.cn/article/66566)
1. 一个promise的当前状态只能是pending、fulfilled和rejected三种之一。状态改变只能是pending到fulfilled或者pending到rejected。状态改变不可逆。
2. promise的then方法接收两个可选参数，表示该promise状态改变时的回调(promise.then(onFulfilled, onRejected))。then方法返回一个promise，then 方法可以被同一个 promise 调用多次。
3. then方法的两个参数如果不是函数，会导致then方法返回一个与之前promise相同状态的promise。



## 分步实现
1. 基本功能: Promise.prototype上的`then/catch`方法的实现.[Example1]()
2. `链式调用`, `Promise.resolve/reject`的实现以及`Promise.prototype.finally`的实现.
3. `Promise.all, race`的实现.



## 思考
1. promise中`status`是不可以人为修改的,所以需要用闭包把它私有化. 
    > 如何在Class中使用私有变量?
2. 如何在promise1.then()之后返回一个新的promise2对象且promise1触发resolve时,promise2的状态随之而变化?


## 文件说明
    - old: 存放以前写的promise
    - promise.js:  存放最新的手写promise
    - simple_promise.js: 简易版(为了说明机制)