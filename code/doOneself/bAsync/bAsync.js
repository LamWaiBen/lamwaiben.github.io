/**
 * 具体思路, 利用generator可以暂停代码执行的特性, 
 * 可以通过yield把异步挂起的promise抛到generator函数外部,
 * 把控制代码继续执行的next放在promise的响应回调中, 可以达到类似于同步的效果.
 * 
 * 另外, 关于参数传递, 可以在next中传输参数, yield中接收, 达到数据交互的效果
 * yield表达式本身没有返回值，或者说总是返回undefined。
 * next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
 * 
 */


// function next(gen, value) {
//     let temp = gen.next(value)
//     if(temp.done) return console.log("finsh")
//     temp.value.then(lastValue => {
//         next(gen, lastValue)
//     })
// }

// function* foo(){
//     let res = yield Promise.resolve("It's res")
//     console.log(1, res)
//     yield new Promise((resolve) => setTimeout(resolve, 2000))
//     console.log(2)
//     yield new Promise((resolve) => setTimeout(resolve, 4000))
//     console.log(3)
//     yield new Promise((resolve) => setTimeout(resolve, 6000))
//     console.log(4)
// }

// // 执行方法
// next(foo())


function run(gen) {
    let g = gen()
    function next(res) {
        let { value, done } = g.next(res)
        if (done) return value
        if (value instanceof Promise) {
            return value.then(res => next(res))
        } else if (typeof value === 'function') {
            return next(value(res))
        } else {
            return next(value)
        }
    }
    return next()
}

function* test() {
    let a = yield 0
    console.log(a)      // 0
    let b = yield Promise.resolve(a + 1)
    console.log(b)      // 1
    let c = yield Promise.resolve(b * 2)
    console.log(c)      // 2
    let d = yield new Promise(resolve => setTimeout(() => resolve(c ** c), c * 1000))
    console.log(d)      // 4
    let e = yield foo(d)
    console.log(e)      // 8
    let f = yield foo.bind(null, e, b)
    return f            // 17
}

function foo(num, num2 = 0) {
    return num * 2 + num2
}

run(test).then(res => {
    console.log('e:', res)
})