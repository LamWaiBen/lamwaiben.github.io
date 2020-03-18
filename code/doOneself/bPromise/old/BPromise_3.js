// 3. Promise.all, race的实现


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
                    
                    // 执行 .then()中的回调函数
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

            // 把then中的回调函数包装起来, 等待异步执行完后,再调用根据状态这些函数
            if (this[_status] === "pending"){
                // 把 onFulfilled 与 onRejected的返回值

                // then执行后返回 newPromise
                return newPromise = new BPromise((resolve, reject) => {
                    this.onFulfilledCallbacks.push(v => {
                        try {
                            let x = onFulfilled(v)  // 执行 .then(onFulfilled)的 onFulfilled 函数, 获得返回值v

                            // 链式调用的关键, 对newPromise的resolve和reject, 根据对onFulfilled的返回值v的类型不同进行下一步处理
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
      * @param {*} x         promise1中Fonfililled的返回值
      * @param {*} resolve   promise2的resolve方法
      * @param {*} reject    promise2的reject方法
      */
    function resolvePromise(promise2, x, resolve, reject){
        if(promise2 === x) return reject(new Error('循环引用'))

        let called = false  // 避免死循环
        
        // 如果x是一个BPromise对象 则判断
        if(x instanceof BPromise){
            if (x[_status] === "pending"){  // 如果x在等待完成, 则用then处理, 等待完成后继续执行
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
                if(typeof then === "function"){ // 含有then方法, 则为thenable对象
                    then.call(x, v => {
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

    BPromise.all = function (promises){
        return new BPromise((resolve, reject) => {
            let num = promises.length
            let values = []
            promises.forEach((promise, index) => {
                promise.then(value => {
                    values[index] = value
                    num -= 1
                    if(num === 0) resolve(values)
                })
            })
        })
    }

    BPromise.race = function (promises){
        return new BPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve, reject)
            })
        })
    }

    return BPromise
})()


module.exports = BPromise
 


// test case
// all
BPromise.all([
    BPromise.resolve(123),
    new BPromise(resolve => setTimeout(() => resolve(456), 1000)),
    BPromise.resolve(789)
]).then(values => console.log('BPromise all values:', values))
// print
//BPromise all values: [ 123, 456, 789 ]

// race
BPromise.race([
    new BPromise(resolve => setTimeout(() => resolve(123), 1001)),
    new BPromise(resolve => setTimeout(() => resolve(456), 1000)),
]).then(value => console.log('BPromise race value:', value))
// print
//BPromise race value: 456
