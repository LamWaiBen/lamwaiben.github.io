## koa-views分析

### 前言
`koa-views`服务器渲染页面


### 使用方法
```javascript
const path = require('path');
const Koa = require('koa');
const views = require('koa-views');

const app = new Koa();

views(app, {
    path: path.join(__dirname, 'views'),
})

app.use(async function (ctx) {
  await ctx.render('user', {
    user: 'John'
  });
});

app.listen(3000);
console.log('listening on port 3000');


```

### 实现步骤
1. 初始化基础参数(path,缓存 等等)
2. 把render方法挂载到app.context上
2. 在各个中间件中通过调用ctx.render方法来渲染模板

### 实现代码
```javascript

// index.js
const path = require('path')
const fs = require('fs')

module.exports = function(app, opts){
    let PATH = opts.path || 'views'
    
    async function render(page, param = {}){
        let ctx = this
        if(page == "/") page = 'index'

        let filePath = path.join(PATH, page + ".html")
        if(fs.existsSync(filePath)){
            let tpl = fs.readFileSync(filePath, 'binary');
            console.log("tpl", tpl)
            let reg = /\<\%([\w| ]+)\%\>/g
            tpl = tpl.replace(reg, (matchStr, group)=>{
                group = group.trim()
                return param[group] || group
            })
            ctx.body = tpl;
        }else{
            ctx.throw('404')
        }
    }

    app.context.render = render
}

// view.html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title><% title %></title>
// </head>
// <body>
//     <p>view page </p>
// </body>
// </html>


// app.js
const Koa = require('koa')
const path = require('path')
const view = require('./index')

const app = new Koa()

view(app, {
    path: path.join(__dirname, 'views'),
})

app.use(async(ctx, next) =>{
    console.log(ctx.path)
    
    if(ctx.path === "/view"){
        await ctx.render(ctx.path, {title: "koa-view title"})
    }else{
        await ctx.render(ctx.path, /* param */)
    }
})

app.listen(80, ()=>{
    console.log('listening port: 80')
})

```

## 附录

### 参考
- [koa-views](https://github.com/queckezz/koa-views)