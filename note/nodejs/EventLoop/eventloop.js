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
│  │       idle, prepare       │        仅内部使用, 闲置阶段
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │     I/O callback, 输入数据.
│  └─────────────┬─────────────┘      │   data, etc.  │     如果poll阶段存在满足时间的定时器, 则会跳到timers
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │       setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │       close事件的callback, 如 socket.on('close', fn), http.server.on('close', fn)
   └───────────────────────────┘



    解析:

    timers:  timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的. 
            由poll轮询是否满足时间下限([1, 2147483647]), 满足后便转到timers执行回调

    poll: 
        1. poll队列不为空的时候, 先遍历队列并同步执行回调(timers >= I/O callback), 直到队列清空或回调数达到上限, 则进入 check 阶段
        2. poll队列为空: 
                1. 如果代码已经被设定 setImmediate 的回调, 那么事件循环结束 poll 阶段进入 check 阶段来执行 check 队列里的回调.
                2. 如果代码没有被设定 setImmediate 的回调: 
                    1. 如果有被设定的 timers , 那么此时事件循环会检查 timers , 
                        如果有一个或多个 timers 下限时间已经到达，那么事件循环将绕回timers阶段，并执行timers的有效回调队列。
                        如果 timers 下限时间没达到, 则阻塞等待。
                    2. 如果没有被设定timers，这个时候事件循环是阻塞在poll阶段等待回调被加入poll队列。

    check: 执行 setImmediate 的回调,
           ps: 只要 poll 队列为空，代码被setImmediate()，无论是否有 timers 达到下限时间，setImmediate 回调都先执行。


    
    
    process.nextTick: process.nextTick 是一个独立于 eventLoop 的任务队列。

    microTask: 在每个阶段结束后都会检查一下是否有microTask需要执行.  优先度: process.nextTick >= Promise




    nodejs定时器执行优先级:
    process.nextTick > Promise > setTimeout = setInterval > setImmediate

    nodejs11之后, 与浏览器的行为一致,
    microTask在每一个事件阶段执行之后都会检查一下 nextTickQueue 和 microTaskQueue 是否有任务需要执行.

   
    PS: nodejs10及10以下的 microTask 的执行时机是在每一轮事件循环完成之后 先去检查 nextTickQueue 和 microTaskQueue
    此外, microTask: process.nextTick 和 Promise 在当轮事件循环结束后, 下一轮循环开始前处理 nextTickQueue 中的事件, 如果递归的话会导致永远阻塞.


 */



// setTimeout 与 setImmediate 的执行顺序不可靠
// 在I/O callback中 setImmediate 比 setTimeout 先执行
// nextTick 在本轮事件循环结束后,下轮事件循环开始前执行.
let fs = require('fs')
function test(){
    setImmediate(() => console.log("setImmediate"))             // check            3
    process.nextTick(() => console.log('nextTick'))             // microTask        1
    setTimeout(() => console.log("setTimeout"), 0)              // timers           2(假设机器比较慢, 后续代码时间超过1ms)
    
    fs.readFile(__filename, () => {                             // poll             
        setTimeout(() => console.log("setTimeout inFile"), 0)   // timers           6
		setImmediate(() => console.log("setImmediate inFile"))  // check            5
        process.nextTick(() => console.log('nextTick inFile'))  // microTask        4
	})
}

test()
// nextTick             // 在该轮事件循环结束后, 下次事件循环开始前执行
// setTimeout           // 由于函数内还存在其他逻辑, 所以消耗时间已达到时间下限(1ms), 所以 setTimeout 先执行
// setImmediate         
// nextTick inFile
// setImmediate inFile
// setTimeout inFile



setTimeout(() => {                          // timers       1
    setTimeout(() => {                      // timers       3
        console.log('test2, setTimeout');
    }, 0);
    for(let i = 0 ; i < 1e9; i++) {}
    setImmediate(() => {                    // check        2
        console.log('test2, setImmediate');
    });
}, 0);
// test2, setImmediate
// test2, setTimeout

// timers >= poll >= check => timers