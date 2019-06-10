const Koa = require('koa'),
    websockify = require('../../module/koa-websocket'),
    co = require('co'),
    compose = require('koa-compose');

const app = websockify(new Koa());

// Regular middleware
// Note it's app.ws.use and not app.use
app.ws.use(function (ctx, next) {
    // return `next` to pass the context (ctx) on to the next ws middleware

    console.log("层1")
    return next(ctx);
});
app.ws.use(function (ctx, next) {
    // return `next` to pass the context (ctx) on to the next ws middleware

    console.log("层2")
    return next(ctx);
});

function fn1(arg){
    return new Promise((resolve, reject)=>{
        // setTimeout(()=>{
            resolve(arg + 1)
        // }, 1000)
    })
}

function fn2(arg){
    return new Promise((resolve, reject)=>{
        // setTimeout(()=>{
            resolve(arg + 1)
        // }, 1000)
    })
}

// Using routes
// app.ws.use(function (ctx, next) {
//     // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
//     // the websocket is added to the context on `ctx.websocket`.
//     ctx.websocket.on('message', async (message)=>{
//         // do something with the message from client



//         let fn1_res = await fn1(message)
//         console.log("fn1", fn1_res)
//         let fn2_res = await fn2(fn1_res)
//         console.log("fn2", fn2_res)
//         console.log("message handle", message, fn1_res, fn2_res, ctx.socketId);
        
//         ctx.websocket.send(fn2_res);
//     });
//     // return next(ctx)
// });


// test middleware
async function middleware1(ctx, next){
    console.log("middleware1 >>>>>")
    ctx.middleware1 = await fn1(ctx.count)
    await next(ctx, 000)
    console.log("middleware1 <<<<<")

    return `middleware1: ${ctx.middleware1}, middleware2: ${ctx.middleware2}`
}


async function middleware2 (ctx, next) {
    console.log("middleware2 >>>>>")
    ctx.middleware2 = await fn2(ctx.middleware1)
    await next(ctx)
    console.log("middleware2 <<<<<")

    return 'middleware2'
}

const fn = co.wrap(compose([middleware1, middleware2]))

app.ws.use(function (ctx, next) {
    ctx.count = 0
    ctx.websocket.on('message', async (message)=>{
        console.log(ctx.socketId, ctx.count)
        let res = await fn(ctx).catch(err => {console.error(err)})
        console.log(ctx.middleware1, ctx.middleware2, ctx.socketId, ctx.count, res)
        ctx.count++
    });
    
});


app.listen(3000);
