// 基于模式的复用
// 模式操作中可以调用其他模式, 达到代码复用的需求

const seneca = require('seneca')()


seneca.add({role:'math', cmd:'sum'}, (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) })
})
seneca.add({role:'math', cmd:'sum', integer: true}, (msg, reply) => {
    // 使用箭头函数时 需要使用 seneca,  使用普通function时, 可以使用this来代替seneca
    seneca.act({ 
        role: 'math', cmd: 'sum', left: Math.floor(msg.left), right: Math.floor(msg.right) 
    }, reply)
})

seneca.act({ role: 'math', cmd: 'sum', left: 1.5, right: 2.5 }, console.log)
seneca.act({ role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true }, console.log)

// 输出结果
// null { answer: 4 }
// null { answer: 3 }