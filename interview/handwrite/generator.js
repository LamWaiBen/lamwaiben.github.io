/* 
    generator自动执行器, 类似 async/await
    亦可以参考 lamwaiben.github.io/code/doOneself/bAsync 中的实现
*/

function run(gen){
    let g = gen()
    function next(data){
        let result = g.next(data)               // next(data)相当于 yeild表达式替换成一个值
        if (result.done) return result.value
        if (result.value instanceof Promise) {      // 处理异步函数
            result.value.then(res => next(res))
        } else if(typeof result.value == 'function') {  // 处理函数, 函数参数通过bind传
            result.value(next)
        } else {
            next(result.value)      // 处理纯数据
        }
    }
    return next()
}


// 测试
function func(data, cb) {
    console.log(data);
    cb();
}

function *test() {
    let c = yield 0
    console.log(c)
    let a = yield Promise.resolve(1)
    console.log(a)
    let b = yield Promise.resolve(2)
    console.log(b);
    yield func.bind(null, a + b);       // 同步函数通过bind传函数, 调用放在自动器中
}

run(test)
// 0
// 1
// 2
// 3