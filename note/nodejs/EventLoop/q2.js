// 探讨 nodejs11 之后, await + 不同变量时的执行时机



////////////////////////// 1. await 后面接非Promise变量时的执行时机 //////////////////////////////////////
console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}
async1()

setTimeout(function () {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
    .then(function () {
        console.log('promise1')
    })
    .then(function () {
        console.log('promise2')
    })
    .then(function () {
        console.log('promise3')
    })

console.log('script end')

// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// promise3
// setTimeout

// await async2()  => await Promise.resolve(undefined),   一个已经settled的promise
// 这样的话, await 会变得更快执行, async1 剩余的代码将被当做 microTask 放进队列
// 与node11 之前的行为一致



////////////////////////// 2. await 后面接Promise变量时的执行时机 //////////////////////////////////////
// console.log('script start')

// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2 end')
//     // return Promise.resolve()
//     return Promise.resolve().then(()=>{      // promise链的长度, 在nodejs11之前会影响先后执行顺序.
//         console.log('async2 end1')           // nodejs11之后可以链只看看做一个promise
//     })
// }
// async1()

// setTimeout(function () {
//     console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//     console.log('Promise')
//     resolve()
// })
//     .then(function () {
//         console.log('promise1')
//     })
//     .then(function () {
//         console.log('promise2')
//     })
//     .then(function () {
//         console.log('promise3')
//     })

// console.log('script end')

// script start
// async2 end
// Promise
// script end
// async2 end1
// promise1
// promise2
// async1 end   // 无论 await pormise的链多长, 都可以看做只有一个promise
// promise3
// setTimeout

// nodejs11之前的行为
// script start
// async2 end
// Promise
// script end
// async2 end1
// promise1
// promise2
// promise3
// async1 end    // 执行时机需要根据 await promise_chain 的长度来判断.
// setTimeout


// await Promise.resolve().then(() => {....}), 一个未被settled的promise
// async1 的代码暂时先挂起, 把当前的 microTask 执行后 再回来执行 await 的这个promise.
// async1 剩余的代码 需要等await promise 的状态变为 RESOLVE 之后才会执行, 所以会比较慢.
