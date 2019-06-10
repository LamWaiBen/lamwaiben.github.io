const Api = require('../../module/koa-hooks')
const DemoService = require('./demo_service')

class DemoApi extends Api {
    constructor(ctx, next, cb) {
        super(ctx, next, cb)
        this.addHooks([
            'sendMessageCode.beforeSendMessageInvokeValidate',
            'sendMessageCode.beforeSendMessageCheckSign'
        ])
    }

    async beforeSendMessageInvokeValidate(ctx, next, cb) {
        console.log("beforeSendMessageInvokeValidate1")
        const data = await DemoService.beforeSendMessageInvokeValidate(ctx, next)
        data ? cb(ctx, data) : await next()

        console.log("beforeSendMessageInvokeValidate2")
    }

    async beforeSendMessageCheckSign(ctx, next, cb) {
        console.log("beforeSendMessageCheckSign1")
        const data = await DemoService.beforeSendMessageCheckSign(ctx, next)
        data ? cb(ctx, data) : await next()
        console.log("beforeSendMessageCheckSign2")
    }

    async sendMessageCode(ctx, next, cb) {
        console.log("sendMessageCode1")
        const data = await DemoService.sendMessageCode(ctx, next)
        data ? cb(ctx, data) : await next()
        console.log("sendMessageCode2")
    }

}

/**
 * cb函数: ctx: koa上下文 data: 接口返回数据
 */
const response = (ctx, data = {}) => {
    switch (data.code ? data.code : 0) {
        case 0:
            ctx.response.status = 200
            break
        default:
            ctx.response.status = 400
            break
    }

    ctx.body = {
        code: data.code ? data.code : 0,
        message: data.message ? data.message : '请求成功',
        data: data.data ? data.data : {}
    }
}




/**
 * app.js
 */
const Koa = require('koa')
const app = new Koa()

/**
 * 请求实例
 */
app.use(async (ctx, next) => {
    let d = new DemoApi(ctx, next, response)
    await d.sendMessageCode(ctx, next, response)
    //next()
})

app.on('error', (err, ctx) => {
    console.error('server error: \n', err, ctx)
})

process.on('uncaughtException', (exception) => {
    console.log('uncaughtException: \n', exception)
})

process.on('unhandledRejection', (reason) => {
    console.error('unhandledRejection: \n', reason)
})

app.listen(process.env.PORT || 4000)

