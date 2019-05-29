## koa-logger分析

### 前言
`koa-logger` 打印http请求/响应日志,大小,耗时


### 使用方法
```javascript
const logger = require('koa-logger')
const Koa = require('koa')

const app = new Koa()
app.use(logger({
  // transporter (str, arg) => {//..}
}))

```

### 实现步骤
1. 拦截请求, 打印请求URL
2. 返回响应, 打印响应URL及耗时


### 实现代码
```javascript

module.exports = ((opts) =>{
  let print = console.log
  if(typeof opts === "function") print = opts
  else if(opts && opts.transporter) print = opts.transporter
  return async function(ctx, next){
    const start = Date.now()
    let res = ctx.res
    print(`<-- ${ctx.method} ${ctx.url}`)
    await next()

    res.once('finish', ()=>{
      print(`--> ${ctx.method} ${ctx.url} time:${Date.now() - start}`)
    })
  }
})()

```

## 附录

### 参考
- [koa-logger](https://github.com/koajs/logger)