## koa-send分析

### 前言
koa-send是Koa.js中支持传输静态文件的官方中间件

主要的功能是
    - 拦截请求, 判断该请求是否请求本地静态资源文件
    - 返回响应, 返回对应的静态文件文本内容或错误提示


### 使用方法
```javascript
const send = require('koa-send');
const Koa = require('koa');
const app = new Koa();


// public/ 为当前项目静态文件目录
app.use(async ctx => {
  await send(ctx, ctx.path, { root: `${__dirname}/public` });
});

app.listen(3000);
console.log('listening on port 3000');

```

### 实现步骤
 1. 配置静态资源绝对路径目录
 2. 判断是否设置默认文件(夹)名
 3. 判断是否支持隐藏文件
 4. 判断是否开启压缩
 5. 获取文件信息
 6. 设置HTTP响应头
 7. 返回文件流数据


### 实现源码
```javascript
const debug = require('debug')('koa-send')
const resolvePath = require('resolve-path')
const createError = require('http-errors')
const assert = require('assert')
const fs = require('mz/fs')

const {
  normalize,
  basename,
  extname,
  resolve,
  parse,
  sep
} = require('path')

/**
 * Expose `send()`.
 */

module.exports = send

/**
 * Send file at `path` with the
 * given `options` to the koa `ctx`.
 *
 * @param {Context} ctx
 * @param {String} path
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

async function send (ctx, path, opts = {}) {
  assert(ctx, 'koa context required')
  assert(path, 'pathname required')

  // options
  // 处理中间件配置 设置默认值
  debug('send "%s" %j', path, opts)
  const root = opts.root ? normalize(resolve(opts.root)) : ''
  const trailingSlash = path[path.length - 1] === '/'
  path = path.substr(parse(path).root.length)
  const index = opts.index
  const maxage = opts.maxage || opts.maxAge || 0
  const immutable = opts.immutable || false
  const hidden = opts.hidden || false
  const format = opts.format !== false
  const extensions = Array.isArray(opts.extensions) ? opts.extensions : false
  const brotli = opts.brotli !== false
  const gzip = opts.gzip !== false
  const setHeaders = opts.setHeaders

  if (setHeaders && typeof setHeaders !== 'function') {
    throw new TypeError('option setHeaders must be function')
  }

  // normalize path
  // 01 配置静态资源绝对路径目录
  path = decode(path)

  if (path === -1) return ctx.throw(400, 'failed to decode')

  // index file support
  // 02 判断是否设置默认文件(夹)名
  if (index && trailingSlash) path += index

  path = resolvePath(root, path)

  // hidden file support, ignore
  // 03 判断是否支持隐藏文件
  if (!hidden && isHidden(root, path)) return

  let encodingExt = ''
  // serve brotli file when possible otherwise gzipped file when possible
  // 判断是否支持压缩以及是否开启压缩, 设置压缩信息
  if (ctx.acceptsEncodings('br', 'identity') === 'br' && brotli && (await fs.exists(path + '.br'))) {
    path = path + '.br'
    ctx.set('Content-Encoding', 'br')
    ctx.res.removeHeader('Content-Length')
    encodingExt = '.br'
  } else if (ctx.acceptsEncodings('gzip', 'identity') === 'gzip' && gzip && (await fs.exists(path + '.gz'))) {
    path = path + '.gz'
    ctx.set('Content-Encoding', 'gzip')
    ctx.res.removeHeader('Content-Length')
    encodingExt = '.gz'
  }

  // 判断extensions选项格式
  if (extensions && !/\.[^/]*$/.exec(path)) {
    const list = [].concat(extensions)
    for (let i = 0; i < list.length; i++) {
      let ext = list[i]
      if (typeof ext !== 'string') {
        throw new TypeError('option extensions must be array of strings or false')
      }
      if (!/^\./.exec(ext)) ext = '.' + ext
      if (await fs.exists(path + ext)) {
        path = path + ext
        break
      }
    }
  }

  // stat
  // 读取文件信息
  let stats
  try {
    stats = await fs.stat(path)

    // Format the path to serve static file servers
    // and not require a trailing slash for directories,
    // so that you can do both `/directory` and `/directory/`
    if (stats.isDirectory()) {
      if (format && index) {    //若开启默认文件 则获取改文件信息
        path += '/' + index
        stats = await fs.stat(path)
      } else {
        return
      }
    }
  } catch (err) {
    const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR']
    if (notfound.includes(err.code)) {
      throw createError(404, err)
    }
    err.status = 500
    throw err
  }

  if (setHeaders) setHeaders(ctx.res, path, stats)

  // stream
  // 设置正文大小, 最后修改时间, 缓存时间
  ctx.set('Content-Length', stats.size)
  if (!ctx.response.get('Last-Modified')) ctx.set('Last-Modified', stats.mtime.toUTCString())
  if (!ctx.response.get('Cache-Control')) {
    const directives = ['max-age=' + (maxage / 1000 | 0)]
    if (immutable) {
      directives.push('immutable')      // immutable  永不改变
    }
    ctx.set('Cache-Control', directives.join(','))
  }
  if (!ctx.type) ctx.type = type(path, encodingExt)
  // 把文件赋值给ctx.body即可
  // 因为koa在response的时候会根据ctx.body的类型做不同的处理, 
  // 对于stream, koa会调用node的http模块, 要对res做文件流的响应, 只需要调用stream.pipe(res)
  ctx.body = fs.createReadStream(path)

  return path
}

/**
 * Check if it's hidden.
 */

function isHidden (root, path) {
  path = path.substr(root.length).split(sep)
  for (let i = 0; i < path.length; i++) {
    if (path[i][0] === '.') return true
  }
  return false
}

/**
 * File type.
 */

function type (file, ext) {
  return ext !== '' ? extname(basename(file, ext)) : extname(file)
}

/**
 * Decode `path`.
 */

function decode (path) {
  try {
    return decodeURIComponent(path)
  } catch (err) {
    return -1
  }
}




```

## 附录

### 参考
- [koa-send](https://github.com/koajs/send)