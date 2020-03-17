// A
setImmediate(() => {
    console.log('setImmediate_1');
});

// B
setTimeout(() => {
    console.log('setTimeout___1');
}, 0);

// C
setTimeout(() => {

    // D
    setImmediate(() => {
        console.log('setImmediate_2');
    });

    // E
    setTimeout(() => {
        console.log('setTimeout___2');
    }, 0);
    
    for(let i = 0; i < 1e8; i++) {} 
    //疑问2: 为什么这里插入阻塞代码却不会出现: setTimeout___2 > setImmediate_2 的情况?
}, 0);

// F
setTimeout(() => {
    console.log('setTimeout___3');
}, 0);
// 疑问1: 怎样才能出现 setTimeout___1 > setTimeout___3 > setImmediate_1 的情况?
// for (let i = 0; i < 1e8; i++) { }



// 打印顺序的可能性:
// setImmediate_1 > setTimeout___1  > setTimeout___3 > setImmediate_2 > setTimeout___2
// setTimeout___1 > setImmediate_1  > setTimeout___3 > setImmediate_2 > setTimeout___2


/**
 * 执行过程:
 * 
 * 1. 执行所有外层定时器, A, B, C, F
 * 
 * 2. 进入第一轮事件循环: 
 *    1. timers: 如果这时候电脑比较慢, 则有可能 B 定时器已满足 1ms的时间下限, 则 B 的回调先执行, 若不满足则 进入poll阶段
 *    2. poll: poll队列为空且这时候检查到有代码设定了 setImmediate(), 则进入check阶段
 *    3. check: 执行定时器 A 的回调, 然后进入第二轮事件循环
 * 
 * 3. 进入第二轮事件循环:
 *    1. timers: 这时候已经满足 1ms 的时间下限, 则 B, C, F 分别按顺序执行他们的回调:
 *               B: 打印
 *               C: 设置两个定时器 D, E, 运算阻塞一定时间
 *               F: 打印
 *    2. poll: 与第一轮类似...
 *    3. check: 执行本轮设定的定时器 D 的回调, 然后进入第三轮事件循环
 * 
 * 4. 进入第三轮事件循环:
 *    1. timers: 执行定时器 E 的回调...
 * 
 * 
 * 
 * 疑问: 
 *  1. 怎样才能出现 setTimeout___1 > setTimeout___3 > setImmediate_1 的情况?
 *  这里猜测是因为 B(setTimeout___1) 是最先设定的setTimeout, 后续的代码很容易就消耗1ms的时间,
 *  如果要时 F(setTimeout___3) 也与 B 类似的话, 则需要在 F 设定后, 插入阻塞代码: 
 *  for (let i = 0; i < 1e8; i++) { }
 * 
 *  2. 为什么在定时器 C 里面, 插入阻塞代码, 却不会出现 setTimeout___2 > setImmediate_2 的情况?
 *  因为定时器 C 执行的时候, 处于 timers 阶段, 此时的 setTimeout 是放入下次事件循环的队列中判断, 
 *  而 setImmediate 则可以在本轮的 poll 阶段执行, 所以即使插入阻塞代码也无法改变执行的先后顺序.
 * 
 */