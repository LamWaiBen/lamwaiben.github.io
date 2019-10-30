/**
 * 具体思路, 利用generator可以暂停代码执行的特性, 
 * 可以通过yield把异步挂起的promise抛到generator函数外部,
 * 把控制代码继续执行的next放在promise的响应回调中, 可以达到类似于同步的效果.
 * 
 * 另外, 关于参数传递, 可以在next中传输参数, yield中接收, 达到数据交互的效果
 */


function next(gen, value) {
    let temp = gen.next(value)
    if(temp.done) return console.log("finsh")
    temp.value.then(lastValue => {
        next(gen, lastValue)
    })
}

function* foo(){
    let res = yield Promise.resolve("It's res")
    console.log(1, res)
    yield new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(2)
    yield new Promise((resolve) => setTimeout(resolve, 4000))
    console.log(3)
    yield new Promise((resolve) => setTimeout(resolve, 6000))
    console.log(4)
}

// 执行方法
next(foo())