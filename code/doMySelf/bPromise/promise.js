/* 
    手写一个简单的promise(非promiseA+)
    完整版可以参考: lamwaiben.github.io/code/doOneself/bPromise

    简单版思路:
    1. 由于promise是可以链式调用的, 也就是说调用.then()之后必须要返回一个newPromise, 所以then函数必须要返回一个newPromise
    2. 因为newPromise的状态是随上一个oldPromise的执行状态而改变的, 也就是newPromise的resolve/reject的触发是在oldPromise执行它自己的resolve/reject,
        所以oldPromise的resolve/reject最主要的功能就是执行newPromise提交的回调函数
*/
const _status = Symbol('status')
const _value = Symbol('value')
const PENDING = 1;
const FULFILLED = 2;
const REJECTED = 3;

class BPromise {
    constructor(func) {
        this[_status] = PENDING;
        this[_value] = undefined;
        this.resolveQueue = [];
        this.rejectQueue = [];

        func(resolve.bind(this), reject.bind(this))

        function resolve(val) {
            if (this[_status] === PENDING) {
                // setTimeout(() => {
                    this[_status] = FULFILLED
                    this[_value] = val
                    this.resolveQueue.forEach(cb => {
                        cb(val)
                    });
                // })
            }
        }

        function reject(err) {
            if (this[_status] === PENDING) {
                // setTimeout(() => {
                    this[_status] = REJECTED
                    this[_value] = err
                    this.rejectQueue.forEach(cb => {
                        cb(err)
                    });
                // })
            }
        }
    }

    then(onResolve, onReject) {
        // 先判断参数合法性, 如果then的参数不是函数时, 默认是一个值传递函数
        onResolve = typeof onResolve == 'function' ? onResolve : val => val
        onReject = typeof onReject == 'function' ? onReject : reason => { throw reason }
        let newPromise = null

        // 如果是Promise.resolve().then()
        if (this[_status] == FULFILLED) {
            return newPromise = new BPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onResolve(this[_value])
                        this.handleThenReturnPromise(newPromise, x, resolve, reject)    // 这里控制返回的newPromise的状态
                    } catch (error) {
                        reject(error)
                    }
                })
            })
            // 如果是Promise.reject().then()
        } else if (this[_status] == REJECTED) {
            return newPromise = new BPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onReject(this[_value])
                        this.handleThenReturnPromise(newPromise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            })
            // 如果是new Promise((resolve, reject) => resolve).then(onResolve, onReject)
        } else if (this[_status] == PENDING) {
            return newPromise = new BPromise((resolve, reject) => {
                // 提供回调函数给oldPromise触发
                this.resolveQueue.push((val) => {
                    setTimeout(() => {
                        try {
                            let x = onResolve(val)
                            this.handleThenReturnPromise(newPromise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })

                this.rejectQueue.push((val) => {
                    setTimeout(() => {
                        try {
                            let x = onReject(val)
                            this.handleThenReturnPromise(newPromise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            })
        }
    }

    catch(onReject) {
        return this.then(null, onReject)
    }

    finally(cb) {
        return this.then(
            val => BPromise.resolve(cb()).then(() => val),
            error => BPromise.resolve(cb()).then(() => error),
        )
    }

    handleThenReturnPromise(newPromise, x, resolve, reject) {
        // 这里其实可以做更多事情: 处理thenable对象, 返回一个新的promise对象
        try {
            if (newPromise === x) return reject(new TypeError('循环引用'));

            // 判断返回值是否为then中是否返回了Promise对象, 如果是则递归
            if (x instanceof BPromise || typeof x['then'] === 'function') {
                x.then(resolve, reject)
            } else {
                resolve(x)
            }
        } catch (error) {
            reject(error)
        }
    }
}


BPromise.resolve = function (val) {
    if (val instanceof BPromise) {
        return val
    }
    return new BPromise(resolve => {
        if (val && val.then && typeof val.then === 'function') {
            setTimeout(() => {
                val.then(resolve)
            })
        } else {
            resolve(val)        // 这里相当于立刻把
        }
    })
}

BPromise.reject = function (err) {
    return new BPromise(resolve, reject => {
        reject(err)
    })
}

BPromise.all = function (promises) {
    return new Promise((resolve, reject) => {
        try {
            let result = []
            let cnt = promises.length
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(res => {
                    result[i] = res
                    if (--cnt === 0) resolve(result)
                }, error => reject(error))
            }
        } catch (error) {
            reject(error)
        }
    })
}

BPromise.race = function (promises) {
    return new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(resolve, reject)
            }
        } catch (error) {
            reject(error)
        }
    })
}


// 测试
new BPromise((resolve, reject) => {
    setTimeout(() => {
        console.log('setTimeout 1000ms')
        resolve(1000)
        // reject(1000)
    }, 1000)
}).then(
    res => {
        console.log('promise then res:', res)
        return res
    },
    err => {
        console.log('promise catch err:', err)
        return -1000
    }).then(
        res => {
            console.log('22222222222222222 promise then res:', res)
            return res
        },
        err => {
            console.log('22222222222222222 promise catch err:', err)
            return -1000
        }
    )


/***************** Promise.resolve(param) 的两种触发时机******************/
// new BPromise((resolve) => {
//     resolve();
//     BPromise.resolve({
//         then: function (resolve, reject) {
//             console.log(1);
//             resolve();
//         },
//     }).then(() => console.log(2));
//     console.log(0);
// }).then(() => console.log(3));
// 0
// 1
// 3
// 2

// new BPromise((resolve) => {
//     resolve();
//     BPromise.resolve().then(() => console.log(2));
// }).then(() => console.log(4));
// 2
// 4

