## koa-bodyparser分析

### 前言
`koa-bodyparser` 解析POST请求表单数据


### 使用方法
```javascript
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');

var app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
});

```

### 实现步骤
1. 拦截POST请求
2. 获取stream数据,解析表单信息
3. 把表单信息挂载到ctx.request.body上


### 实现代码
```javascript

  // 获取stream数据
  function readStream(req){
    return new Promise((resolve, reject) =>{
      streamEventListen(req, (data) =>{
        resolve(data)
      })
    })
  }

  function streamEventListen(req, cb){
    let buf = []
    let stream = req.req || req
    stream.onData((chunk)=>{
      // chunk <Buffer 66 72 6f 6d 53 49 44 3d 31 32 33 26 66 72 6f 6d 50 49 44 3d 33 32 31 33 26 74 6f 50 49 44 3d 33 33 33 33> 
      buf = buf.concat(chunk)
    })
    stream.onEnd(()=>{
      let str = String.fromCharCode.apply(null, buf);
      cb(str)    // fromSID=123&fromPID=3213&toPID=3333
      buf = []
    })
  }

  // queryStrToObject
  function parseQueryStr(str){
    let data = {}
    let strList = str.split(/&|=/)
    for(let i = 0; i < strList.length; i++){
      data[strList[i]] = strList[++i]
    }
    return data
  }

  module.export = bodyParser
  // default json types
  var jsonTypes = [
    'application/json',
    'application/json-patch+json',
    'application/vnd.api+json',
    'application/csp-report',
  ];

  // default form types
  var formTypes = [
    'application/x-www-form-urlencoded',
  ];

  // default text types
  var textTypes = [
    'text/plain',
  ];

  function bodyParser(){
    return async function(ctx, next){
      if(!ctx.request.body && ctx.method === "POST"){
        let str = await readStream(ctx.request.req)
        let result = str
        if(ctx.request.is(formTypes)){
          result = parseQueryStr(str)
        }else if(ctx.request.is(jsonTypes)){
          // todo
        }

        ctx.request.body = result;
      }

      await next()
    }
  }
```

## 附录

### 参考
- [koa-bodyparser](https://github.com/koajs/bodyparser)