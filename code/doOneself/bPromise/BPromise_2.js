// 2. 链式调用, Promise.resolve/reject的实现以及Promise.prototype.finally的实现.
// then方法的两个参数如果不是函数，then方法则返回一个与之前PromiseValue相同的promise。
// 若对应的handle函数不存在时, 则相当于返回Promise.resolve(PromiseValue)

// 卡点:
// .then(doSomething1).then(doSomething2).catch(resason) 链式调用实现思路, 
//  1. promiseObj.then().then(), promiseObj的状态有3种情况: 1. fulfilled  2. rejected  3. pending
//  2. fulfilled/rejected 只需要执行 .then(resolveHandle, rejectHandle) 对应的handle, handle中返回新的promiseObj
//  3. 
//  resolve值为:
//  1. 普通值 2.promise对象 3.thenable对象/函数(伪promise) 的处理

const BPromise = (function(){
    let _status = Symbol("status")
    let _value = Symbol('value')

    class BPromise{
        constructor(fn){
            this[_status] = "pending"
            this[_value] = undefined
            this.onFulfilled = null
            this.onRejected = null

            this.onFulfilledCallbacks = [];
            this.onRejectedCallbacks = [];

            fn(this.resolveHandle.bind(this), this.rejectHandle.bind(this))
        }


        resolveHandle(value){
            if(value instanceof BPromise){
                return value.then(resolveHandle, rejectHandle)
            }

            setTimeout(()=>{
                // 只对未处理的promise操作
                if (this[_status] === "pending"){
                    this[_status] = "fulfilled"
                    this[_value] = value
                    
                    // then方法返回新promise的关键
                    this.onFulfilledCallbacks.forEach(cb => cb(this[_value]))
                }
            })
        }

        rejectHandle(value){
            setTimeout(() => {
                // 只对未处理的promise操作
                if (this[_status] === "pending") {
                    this[_status] = "rejected"
                    this[_value] = value

                    // catch方法返回新promise的关键
                    this.onRejectedCallbacks.forEach(cb => cb(this[_value]))
                }
            })
            return BPromise.reject(value)
        }

        then(onFulfilled, onRejected){
            onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value
            onRejected = typeof onRejected === "function" ? onRejected : reason => {throw reason}

            let newPromise = null

            if (this[_status] === "fulfilled"){
                return newPromise = new BPromise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this[_value])
                            resolvePromise(newPromise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }

            if (this[_status] === "rejected"){
                return newPromise = new BPromise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this[_value])
                            resolvePromise(newPromise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }

            if (this[_status] === "pending"){
                // 把 onFulfilled 与 onRejected的返回值
                return newPromise = new BPromise((resolve, reject) => {
                    this.onFulfilledCallbacks.push(v => {
                        try {
                            let x = onFulfilled(v)
                            resolvePromise(newPromise, x, resolve, reject)
                        } catch(e){
                            reject(e)
                        }
                    })
                    this.onRejectedCallbacks.push(reason => {
                        try {
                            let x = onRejected(reason)
                            resolvePromise(newPromise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }

        }

        catch(onRejected){
            this.then(null, onRejected)
        }

        finally(onFinally){
            return this.then(
                value => this.resolveHandle(onFinally()).then(() => value),
                reason => this.rejectHandle(onFinally()).then(() => { throw reason })
            );
        }
    }

     /**
      * 链式调用的关键 对then方法所返回的promise2对象进行操作
      * 由于resolve中的值可能存在几种情况: 1. 普通值 2.promise对象 3.thenable对象/函数(伪promise)
      * 针对resolve中不同情况进行处理
      * @param {*} promise2  promise1中返回的新的promise对象
      * @param {*} x         promise1中onFulfilled/onRejected的返回值
      * @param {*} resolve   promise2的resolve方法
      * @param {*} reject    promise2的reject方法
      */
    function resolvePromise(promise2, x, resolve, reject){
        if(promise2 === x) return reject(new Error('循环引用'))

        let called = false  // 避免死循环
        
        // 如果x是一个BPromise对象 则判断
        if(x instanceof BPromise){
            if (x[_status] === "pending"){
                x.then(v => {
                    resolvePromise(promise2, v, resolve, reject)
                }, reason => {
                    reject(reason)
                })
            }else{
                // 如果x已经被执行过, 则用相同的值传递下去
                x.then(resolve, reject)
            }

            // 如果x为对象或函数
        }else if(x != null && (typeof x === "object" || typeof x === "function")){
            try {
                let then = x.then
                if(typeof then === "function"){ // 含有then方法
                    then.call(x, v =>{
                        if(called) return
                        called = true
                        resolvePromise(promise2, v, resolve, reject)
                    }, reason => {
                        if(called) return
                        called = true
                        reject(reason)
                    })
                }else{  // 若普通对象直接resolve
                    resolve(x)
                }
            } catch (e) {
                if(called) return
                if (called) return
                called = true
                reject(e)
            }
        }else{
            // 直接返回x
            resolve(x)
        }
    }

    BPromise.resolve = function(value){
        return new BPromise(resolve => {
            setTimeout(() => {
                resolve(value)
            }, 0)
        })
    }

    BPromise.reject = function(value){

        return new BPromise((resolve, reject) => {
            setTimeout(() => {
                reject(value)
            }, 0)
        })
    }

    return BPromise
})()


module.exports = BPromise
 

// test case 1
var a = new BPromise((resolve, reject) => {
    setTimeout(resolve, 500)
})
console.log("pending", a)
var b = a.then(value => 123)

setTimeout(()=>{
    console.log("fulfilled", a, b)
}, 1000)

/**
 * print
 * 111111111 BPromise {
  onFulfilled: null,
  onRejected: null,
  onFulfilledCallbacks: [],
  onRejectedCallbacks: [],
  [Symbol(status)]: 'pending',
  [Symbol(value)]: undefined }
  2222222222 BPromise {
  onFulfilled: null,
  onRejected: null,
  onFulfilledCallbacks: [ [Function] ],
  onRejectedCallbacks: [ [Function] ],
  [Symbol(status)]: 'fulfilled',
  [Symbol(value)]: undefined } BPromise {
  onFulfilled: null,
  onRejected: null,
  onFulfilledCallbacks: [],
  onRejectedCallbacks: [],
  [Symbol(status)]: 'fulfilled',
  [Symbol(value)]: 123 }
 */



 // test case 2
// var fin = new BPromise((resolve, reject) =>{
//     setTimeout(() => reject('isReject'), 1000)
// })
// console.log("pending", fin)

// var a = fin.finally(v =>{
//     console.log('It"s finally,', v)
// })

// setTimeout(() => {
//     console.log("fulfilled", fin, a)
// }, 2000)

/**
 * print
 * pending BPromise {
  onFulfilled: null,
  onRejected: null,
  onFulfilledCallbacks: [],
  onRejectedCallbacks: [],
  [Symbol(status)]: 'pending',
  [Symbol(value)]: undefined }
  It"s finally, undefined
  fulfilled BPromise {
  onFulfilled: null,
  onRejected: null,
  onFulfilledCallbacks: [ [Function] ],
  onRejectedCallbacks: [ [Function] ],
  [Symbol(status)]: 'rejected',
  [Symbol(value)]: 'isReject' } BPromise
  onFulfilled: null,
  onRejected: null,
  onFulfilledCallbacks: [],
  onRejectedCallbacks: [],
  [Symbol(status)]: 'rejected',
  [Symbol(value)]: undefined }
 */