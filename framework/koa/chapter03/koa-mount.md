## koa-mount分析

### 前言
`koa-mount`多koa应用管理模块


### 使用方法
```javascript
const mount = require('koa-mount');
const Koa = require('koa');

// hello
const a = new Koa();
a.use(async function (ctx, next){
  await next();
  ctx.body = 'Hello';
});

// world
const b = new Koa();
b.use(async function (ctx, next){
  await next();
  ctx.body = 'World';
});

// app
const app = new Koa();
app.use(mount('/hello', a));
app.use(mount('/world', b));
app.listen(3000);
```

### 实现步骤
1. 参数处理,初始化过滤,阀等条件


### 实现代码
```javascript


```

## 附录

### 参考
- [koa-mount](https://github.com/koajs/mount)