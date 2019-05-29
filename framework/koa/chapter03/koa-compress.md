## koa-compress分析

### 前言
`koa-compress`用于控制服务器是否开启gzip


### 使用方法
```javascript
var compress = require('koa-compress')
var Koa = require('koa')

var app = new Koa()
app.use(compress({
  filter: function (content_type) {
  	return /text/i.test(content_type)
  },
  threshold: 2048,        //起步条件
  flush: require('zlib').Z_SYNC_FLUSH//用于设定或读取压缩方法及状态  Z_SYNC_FLUSH: 异步的flush值
}))

```

### 实现步骤
1. 参数处理,初始化过滤,阀等条件
2. 判断请求预期接收类型是否支持压缩
3. 使用zlib模块压缩响应文件


### 实现代码
```javascript
const compressible = require('compressible')
const isJSON = require('koa-is-json')
const status = require('statuses')
const Stream = require('stream')
const bytes = require('bytes')
const zlib = require('zlib')

/**
 * Encoding methods supported.
 */

const encodingMethods = {
  gzip: zlib.createGzip,
  deflate: zlib.createDeflate
}

/**
 * Compress middleware.
 *
 * @param {Object} [options]
 * @return {Function}
 * @api public
 */

module.exports = (options = {}) => {
  let { filter = compressible, threshold = 1024 } = options
  if (typeof threshold === 'string') threshold = bytes(threshold)   // "2kb => 2048" 

  return async (ctx, next) => {
    ctx.vary('Accept-Encoding')

    await next()

    let { body } = ctx
    if (!body) return
    // 判断请求类型状态是否可压缩, 请求响应是否可写
    if (ctx.res.headersSent || !ctx.writable) return
    if (ctx.compress === false) return
    if (ctx.request.method === 'HEAD') return
    if (status.empty[ctx.response.status]) return
    if (ctx.response.get('Content-Encoding')) return  // 响应内容编码是否已经被指定

    // forced compression or implied
    // 检查是否需要压缩, 过滤
    if (!(ctx.compress === true || filter(ctx.response.type))) return

    // identity
    // 判断请求期望返回是否支持压缩
    const encoding = ctx.acceptsEncodings('gzip', 'deflate', 'identity')
    if (!encoding) ctx.throw(406, 'supported encodings: gzip, deflate, identity')
    if (encoding === 'identity') return

    // json   // 支持json类型雅的压缩
    if (isJSON(body)) body = ctx.body = JSON.stringify(body)

    // threshold  // 判断是否达到压缩大小
    if (threshold && ctx.response.length < threshold) return

    ctx.set('Content-Encoding', encoding)
    ctx.res.removeHeader('Content-Length')

    const stream = ctx.body = encodingMethods[encoding](options)

    if (body instanceof Stream) {
      body.pipe(stream)
    } else {
      stream.end(body)
    }
  }
}

```

## 附录

### 参考
- [koa-compress](https://github.com/koajs/compress)