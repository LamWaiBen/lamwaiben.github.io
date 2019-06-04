// 微服务模块

module.exports = function math(options) {

    this.add('role:math,cmd:sum', function sum(msg, respond) {
        respond(null, { answer: msg.left + msg.right })
    })

    this.add('role:math,cmd:product', function product(msg, respond) {
        respond(null, { answer: msg.left * msg.right })
    })

    //warp方法可以把给所有匹配的模式加上相同的动作扩展函数
    this.wrap('role:math', function (msg, respond) {
        console.log('warp role:math', msg)
        msg.left = Number(msg.left).valueOf()
        msg.right = Number(msg.right).valueOf()
        this.prior(msg, respond)
    })
}