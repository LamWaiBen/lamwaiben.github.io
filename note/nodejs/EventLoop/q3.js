setTimeout(() => {
    console.log('timeout1')
    Promise.resolve().then(() => console.log('promise resolve'))
    process.nextTick(() => console.log('next tick1'))
});
setTimeout(() => {
    console.log('timeout2')
    process.nextTick(() => console.log('next tick2'))
});
setTimeout(() => console.log('timeout3'));
setTimeout(() => console.log('timeout4'));


/**
 * 
 * 
 * 在 node11 之前，因为每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，
 * 会让这部分任务优先于微任务执行，因此上述代码是先进入 check 阶段，执行所有 setImmediate，
 * 完成之后执行 nextTick 队列，最后执行微任务队列，
 * 因此输出为timeout1=>timeout2=>timeout3=>timeout4=>next tick1=>next tick2=>promise resolve
 * 
 * 在 node11 之后，process.nextTick 是微任务的一种,因此上述代码是先进入 check 阶段，执行一个 setImmediate 宏任务，
 * 然后执行其微任务队列，再执行下一个宏任务及其微任务,
 * 因此输出为timeout1=>next tick1=>promise resolve=>timeout2=>next tick2=>timeout3=>timeout4
 *
 * 
 * 简单来说就是: 
 * node11之前  每一轮eventLoop结束后, 才检查nextTick队列>=microTask
 * node11之后, 每执行一个macroTask之后, 就去检查microTask(nextTick属于优先级最高的microTask)
 */