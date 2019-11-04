/**
 * 
 * 由 libuv 库实现的事件循环   
 * 
 *  Node的Event Loop分为6个阶段
   ┌───────────────────────────┐
┌─>│           timers          │        setTimeout 和 setInterval
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


    此外, process.nextTick 不论当前在上面阶段, 都将在当前操作完成后处理 nextTickQueue 中的事件

 */



// setTimeout 与 setImmediate 的执行顺序不可靠
// 在I/O callback中 setImmediate 比 setTimeout 先执行
// nextTick 在任何阶段都可以执行
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
// nextTick
// setTimeout           // 位置不确定
// setImmediate         // 位置不确定
// nextTick inFile
// setImmediate inFile
// setTimeout inFile
