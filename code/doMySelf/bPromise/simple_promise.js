// 链式调用的原理, 不考虑错误处理, thenable等机制...

class Promise {
    constructor(fn) {
        this.status = 0
        this.value = undefined
        this.resolveQueue = []
        fn(resolve.bind(this))
        function resolve(val) {
            if(this.status == 0) {
                setTimeout(() => {
                    this.status = 1
                    this.value = val
                    this.resolveQueue.forEach(cb => {
                        cb(val)
                    });
                })
            }
        }
    }

    then(onResolve) {
        // promise 链式调用的精髓
        // 每一次调用.then(), 都会返回一个new_promise, 
        // new_promise的resolve在当前promise的resolveQueue中用函数包裹, 
        // 等当前promise执行resolve时, 遍历resolveQueue, new_promise的resolve便会执行, 并接受当前promise的onResolve的返回值
        // 如果返回值为promise则也需要等待该promise返回结果才行.
        return new Promise(resolve => {
            this.resolveQueue.push(val => {
                let x = onResolve(val)
                x instanceof Promise ? x.then(resolve) : resolve(x)
            })
        })
    }
}




new Promise(resolve => {
    // resolve(1)
    setTimeout(() => {
        resolve(1)
    }, 1000)
}).then(res => {
    console.log(res)
    // return 2
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2)
        }, 3000)
    })
}).then(res => {
    console.log(res)
})