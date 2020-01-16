// 1. Promise.prototype上的`then/catch`方法的实现

// 未实现:
// then/catch 未对参数判断, 处理不同类型参数时的情况
// Promise.resolve/reject
// 链式调用

const BPromise = (function(){
    let _status = Symbol("status")
    let _value = Symbol('value')

    class BPromise{
        constructor(fn){
            this[_status] = "pending"
            this[_value] = undefined
            this.onFulfilled = null
            this.onRejected = null

            fn(this.resolveHandle.bind(this), this.rejectHandle.bind(this))
        }

        resolveHandle(value) {
            this[_status] = "fulfilled"
            if (this.onFulfilled) {
                this[_value] = this.onFulfilled(value)
            } else {
                this[_value] = value
                return this
            }
        }

        rejectHandle(value) {
            this[_status] = "rejected"
            if (this.onRejected) {
                this[_value] = this.onRejected(value)
            } else {
                this[_value] = value
                return this
            }
        }

        then(onFulfilled, onRejected) {
            if (typeof onFulfilled === "function") {
                this.onFulfilled = onFulfilled
            }

            if (typeof onRejected === "function") {
                this.onRejected = onRejected
            }

            return this
        }

        catch(onRejected) {
            this.onRejected = onRejected
            return this
        }
    }
    return BPromise
})()


module.exports = BPromise
 


// test case
let promise = new BPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('isResolve')
        // reject('isReject')
    }, 1000)
})
promise
    .then(res => {
        console.log('1 resolve,', res, promise)
        return 123
    }, err => {
    console.log('1 reject,', err)
})

console.log("222222", promise)

setTimeout(() => {
    console.log(promise)
}, 2000)

// print
// 222222 BPromise {
//     value: undefined,
//     onFulfilled: [Function],
//     onRejected: [Function],
//     [Symbol(status)]: 'pending'
// }
// 1 resolve, isResolve BPromise {
//     value: undefined,
//     onFulfilled: [Function],
//     onRejected: [Function],
//     [Symbol(status)]: 'fulfilled'
// }
// BPromise {
//     value: 123,
//     onFulfilled: [Function],
//     onRejected: [Function],
//     [Symbol(status)]: 'fulfilled'
// }