// 扩展匹配模式
// 当存在两个或以上有交叉的模式时, 更多匹配项目被匹配到的优先, 被匹配到的属性越多, 则优先级越高
// 当发送的动作匹无法匹配到对应的模式时, 会报错

const seneca = require('seneca')()


seneca.add({role:'math', cmd:'sum'}, (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) })
})

seneca.act({ role: 'math', cmd: 'sum', left: 1.5, right: 2.5 }, console.log)
seneca.act({ role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true }, console.log)

setTimeout(() =>{
    seneca.add({ role: 'math', cmd: 'sum', integer: true  }, (msg, reply) => {
        reply(null, { answer: (Math.floor(msg.left) + Math.floor(msg.right)) })
    })

    seneca.act({ role: 'math', cmd: 'sum', left: 1.5, right: 2.5 }, console.log)
    seneca.act({ role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true }, console.log)
}, 100)

// 输出结果
// null { answer: 4 }
// null { answer: 4 }
// null { answer: 4 }
// null { answer: 3 }