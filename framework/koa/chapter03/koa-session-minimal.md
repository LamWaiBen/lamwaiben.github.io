## koa-session-minimal分析

### 前言
`koa-session-minimal`session生成/使用模块


### 使用方法
```javascript
const Koa = require('koa')
const session = require('./index')

const app = new Koa()
const PORT = 80

app.use(session({
    cookie: {
        maxAge: 10 * 1000
    }
}))

app.use(async (ctx, next) => {
    ctx.session.count = ctx.session.count || 0
    if(ctx.path == "/add") ctx.session.count += 1
    await next()
    ctx.body = ctx.session.count
})


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

```

### 实现步骤
1. 初始化session, 加载参数(cookie等)
2. 根据cookie获取/生成session_id
3. 根据sid获取对应session数据, 并挂载到ctx中
4. `await next()`之后保存session数据,更新cookie

### 实现代码
```javascript
module.exports = function(opts){

    let cookieOpts = opts.cookie
    let hash = {}

    return async function (ctx, next){
        
        let sid = ctx.cookies.get("sid")
        if(!sid) sid = "" + Date.now() + "_" + ~~(Math.random() * 1000)

        // 加载session
        let session = hash[sid]
        if (!session) hash[sid] = session = {}
        
        ctx.session = session
        
        await next()

        // todo 保存session to db
        ctx.cookies.set("sid", sid, cookieOpts)
    }
}

```

## 附录

### 参考
- [koa-session-minimal](https://github.com/longztian/koa-session-minimal)