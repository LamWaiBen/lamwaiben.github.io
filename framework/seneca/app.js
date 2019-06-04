const seneca = require('seneca')()

// seneca.add('role:math, cmd:sum', (msg, reply) => {
//     reply(null, {answer: ( msg.left + msg.right )})
// }).listen({type: 'tcp'})

seneca.client({type: 'tcp'}).act({
    role: 'math',
    cmd: 'sum',
    left: 1,
    right: 2
}, console.log)