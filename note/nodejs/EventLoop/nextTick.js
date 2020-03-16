/**
 * 
 * 定时器中process.nextTick 和 promise 都是在事件循环之外, 可以达到阻塞事件循环的效果
 */

let count = 0;
let isNextTick = true
function nextTick(){
    console.log(count++)
    isNextTick && process.nextTick(nextTick)
    if(count > 1e4) isNextTick = false
}

// 在process.nextTick()停止之前, 无法执行
setTimeout(() => {
    console.log('setTimeout')
})
nextTick()


// let count = 0;
// let isPromise = true
// function promise(){
//     console.log(count++)
//     isPromise && Promise.resolve().then(promise)
//     if(count > 1e4) isPromise = false
// }

// setTimeout(() => {
//     console.log('setTimeout')
// })
// promise()