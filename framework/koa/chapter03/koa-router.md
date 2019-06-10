## koa-router分析

### 前言
`koa-router`服务器路由


### 使用方法
```javascript
const Koa = require('koa')

const Router = require('./router')

const app = new Koa()
const router = new Router()

const PORT = 80

// 绑定子中间件
router.get('/123', async (ctx, next) => {
    // ctx.router available
    // console.log('router path: /')
    ctx.body = "It's /123 page"
});

app.use(router.routes())        // 输出路由的父中间件
// app.use(router.allowedMethods())    // 设置 status 以及 header中Allow信息

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

```

### 实现步骤
1. 初始化路由
2. 在路由上根据路径与方法,注册中间件
3. 路由返回父中间件`router.routes()`, 
4. 应用实例使用`app.use()`路由输出的父中间件


### 实现代码
```javascript
// router.js
const MATHODS = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']

class Layer{
    constructor(path, method, middleware){
        this.path = path
        this.method = method
        this.middleware = middleware
    }
}

class Router{
    constructor(){
        this.stack = []

    }

    routes(){
        return async (ctx, next) =>{
            let curPath = ctx.path
            let method = ctx.method
            for(let layer of this.stack){
                if (layer.path === curPath && ctx.method === method){
                    // 把上下文传到路由中绑定的中间件
                    await layer.middleware(ctx, next)
                }
            }
            await next()
        }
    }

    allowedMethods(){
        return async (ctx, next) =>{

        }
    }

    // 把子中间件收集, 由实例中返回父中间件
    register(path, method, middleware, opts){
        let layer = new Layer(path, method, middleware)
        this.stack.push(layer)
    }
}

for (let method of MATHODS){
    Router.prototype[method.toLowerCase()] = Router.prototype[method] = function (path, middleware){
        this.register(path, method, middleware)
    }
}

module.exports = Router


// app.js
const Koa = require('koa')

const Router = require('./router')

const app = new Koa()
const router = new Router()

const PORT = 80

// 绑定子中间件
router.get('/', async (ctx, next) => {
    ctx.body = "It's / page"
});
router.get('/123', async (ctx, next) => {
    ctx.body = "It's /123 page"
});

app.use(router.routes())        // 输出路由的父中间件
// app.use(router.allowedMethods())    // 设置 status 以及 header中Allow信息


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

```

## 附录

### 参考
- [koa-router](https://github.com/ZijianHe/koa-router)