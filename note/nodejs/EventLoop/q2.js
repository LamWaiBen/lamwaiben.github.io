// eg1: async函数返回非promise类型
// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2 end')
// }
// async1()


// new Promise(resolve => {
//     console.log('Promise')
//     resolve()
// })
// .then(function () {
//     console.log('promise1')
// })
// .then(function () {
//     console.log('promise2')
// })
// .then(function () {
//     console.log('promise3')
// })

/**
 * node11之前, node11之后, 浏览器的行为均一致:
 *   await剩余的代码立刻进入microTask队列
 * 
 * async2 end
 * Promise
 * async1 end
 * promise1
 * promise2
 * promise3
 */



// eg2: async函数返回promise类型(未被then处理)
// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2 end')
//     return Promise.resolve()
// }
// async1()


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

/**
 * node11之前,  与返回非promise的行为一致
 * async2 end
 * Promise
 * async1 end
 * promise1
 * promise2
 * promise3
 * 
 * node11之后, 浏览器的行为一致, await延后执行了, 按照promise的层数来处理
 * async2 end
 * Promise
 * promise1
 * promise2
 * async1 end
 * promise3
 */




// eg3: async函数返回promise类型(被then处理过)
async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return Promise.resolve().then(() => {
        console.log('async2 then')
    })
}
async1()


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
    .then(function () {
        console.log('promise4')
    })

/**
 * node11之前,  与以前不一样, 比node11延迟一个promise执行
 * async2 end
 * Promise
 * async2 then
 * promise1
 * promise2
 * promise3
 * async1 end
 * promise4
 *
 * node11之后, 浏览器的行为一致, 有无then处理的promise不影响顺序, 仍然按照promise的层数决定
 * async2 end
 * Promise
 * async2 then
 * promise1
 * promise2
 * async1 end
 * promise3
 * promise4
 */