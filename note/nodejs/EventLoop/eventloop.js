/**
 * 参考: https://segmentfault.com/a/1190000013102056
 * 
 * 由 libuv 库实现的事件循环   
 * 
 *  Node的Event Loop分为6个阶段
   ┌───────────────────────────┐
┌─>│           timers          │        若达到 setTimeout 和 setInterval 设定的时间下限, 则执行回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │        少数 I/O callback (error之类的callback)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │        仅内部使用
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │     I/O callback
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │       setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │       close事件的callback, 如 socket.on('close', fn), http.server.on('close', fn)
   └───────────────────────────┘


    此外, microTask: process.nextTick 和 Promise 在当轮事件循环结束后, 下一轮循环开始前处理 nextTickQueue 中的事件, 如果递归的话, 可以有会有爆栈的可能


    nodejs定时器执行优先级:
    process.nextTick() > Promise > setImmediate > setTimeout = setInterval


 */



// setTimeout 与 setImmediate 的执行顺序不可靠
// 在I/O callback中 setImmediate 比 setTimeout 先执行
// nextTick 在本轮事件循环结束后,下轮事件循环开始前执行.
let fs = require('fs')
function test(){
    setImmediate(() => console.log("setImmediate"))
    process.nextTick(() => console.log('nextTick'))
    setTimeout(() => console.log("setTimeout"), 0)
    
    fs.readFile(__filename, () => {
        setTimeout(() => console.log("setTimeout inFile"), 0)
		setImmediate(() => console.log("setImmediate inFile"))
        process.nextTick(() => console.log('nextTick inFile'))
	})
}

test()
// nextTick             // 在该轮事件循环结束后, 下次事件循环开始前执行
// setTimeout           // 由于函数内还存在其他逻辑, 所以消耗时间已达到时间下限(1ms), 所以 setTimeout 先执行
// setImmediate         
// nextTick inFile
// setImmediate inFile
// setTimeout inFile



setTimeout(() => {
    setImmediate(() => {
        console.log('test2, setImmediate');
    });
    setTimeout(() => {
        console.log('test2, setTimeout');
    }, 0);
}, 0);
// test2, setImmediate
// test2, setTimeout

// 执行过程
// timers 队列检查是否满足时间下限 => 外层setTimeout执行回调
// pending callbacks 队列为空
// idle, prepare 队列为空
// poll => 队列为空, 检查到有 setImmedate()
// check => 执行 setImmediate()
// close callbacks => 队列为空 => 进行下一轮事件循环

// timers 队列检查是否满足时间下限 => 内层setTimeout执行回调