## koa-static分析

### 前言
koa官方在`koa-send`的基础上进行了二次封装, 推出了`koa-static`用于做静态服务器或静态资源管理


### 使用方法
```javascript
const path = require('path');
const Koa = require('koa');
const static = require('koa-static');

const app = new Koa();

const root = path.join(__dirname, './public');
app.use(static({ root }));

app.listen(3000);
console.log('listening on port 3000');

```

### 实现步骤
1. 配置静态资源绝路路径目录
2. 判断是否支持等待其他请求
3. 判断HTTP头是否为GET或HEAD类型
4. 通过`koa-send`读取和返回静态文件


### 实现代码
```javascript
const debug = require('debug')('koa-static')
const { resolve } = require('path')
const assert = require('assert')
const send = require('koa-send')    // 依赖了koa-send

/**
 * Expose `serve()`.
 */

module.exports = serve

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function serve (root, opts) {
  opts = Object.assign({}, opts)

  assert(root, 'root directory is required to serve files')

  // options
  debug('static "%s" %j', root, opts)
  // 01 配置静态资源绝路路径目录
  opts.root = resolve(root)
  if (opts.index !== false) opts.index = opts.index || 'index.html'

  // 02 判断是否支持等待其他请求
  if (!opts.defer) {    // defer: 推迟
    // 决定是否先执行其他中间件, 若 defer为false, 则不推迟, 优先返回静态文件
    return async function serve (ctx, next) {
      let done = false

      if (ctx.method === 'HEAD' || ctx.method === 'GET') {  // 03 判断HTTP头是否为GET或HEAD类型
        try {
          done = await send(ctx, ctx.path, opts)            // 04 通过koa-send读取和返回静态文件
        } catch (err) {
          if (err.status !== 404) {
            throw err
          }
        }
      }

      if (!done) {
        await next()
      }
    }
  }

   // defer为true, 优先执行其他中间件, 确定其他中间件没有处理过该请求时才返回对应的静态资源
  return async function serve (ctx, next) {
    await next()

    if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return   // 03 判断HTTP头是否为GET或HEAD类型
    // response is already handled
    // 判断该请求是否已经被其他中间件处理
    if (ctx.body != null || ctx.status !== 404) return // eslint-disable-line

    try {
      await send(ctx, ctx.path, opts)                           // 04 通过koa-send读取和返回静态文件
    } catch (err) {
      if (err.status !== 404) {
        throw err
      }
    }
  }
}

```

## 附录

### 参考
- [koa-static](https://github.com/koajs/static)