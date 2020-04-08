// 时间切片函数
// 把耗时过长的同步任务, 在时间维度上切成多片执行, 避免堵塞其他逻辑的运行

// link: https://github.com/berwin/Blog/issues/38

const TIME = 50;    // 50毫秒为切片间隔
function ts(gen) {
    if(typeof gen === 'function') gen = gen();
    if(!gen || typeof gen.next !== 'function') return;

    let timer = typeof performance === 'undefined' ? Date : performance;
    return function next(){
        let start = timer.now();
        let res = null
        do {
            res = gen.next();
        } while (!res.done && timer.now() - start < TIME);

        if(res.done) return;
        setTimeout(next);
    }
}


// eg:
ts(function * () {
    let start = Date.now();
    while (Date.now() - start < 1000) {
        console.log(1);
        yield;
    }
    console.log('done!')
})()
