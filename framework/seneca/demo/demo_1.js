// 进程内消息通信

const seneca = require('seneca')()

/**
 * seneca.add方法 有两个参数
 * 1. pattern       用于匹配 Seneca 实例中 JSON 消息体的模式
 * 2. action        模式被匹配时执行的操作
 */
seneca.add('role:math, cmd:sum', (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) })
})


/**
 * seneca.act 方法 有两个参数
 * 
 * 1. msg          入站参数
 * 2. respond      接收并处理响应消息的回调函数
 * 
 * 此外, seneca.act 是可以链式调用的, 按顺序执行,但是并非串行, 所以返回结果的顺序可能与调用顺序并非一样
 */
seneca.act({
    role: 'math',
    cmd: 'sum',
    left: 10,
    right: 20
}, (err, result) => {
    if (err) return console.error('math_sum error:', err)
    console.log('result', result)
}).act({
    role: 'math',
    cmd: 'sum',
    left: 50,
    right: 50
}, (err, result) => {
    if (err) return console.error('math_sum error:', err)
    console.log('result', result)
})
