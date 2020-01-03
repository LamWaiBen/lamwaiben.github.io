
## 记录学习koa2框架的源码,设计思路 ##


* 1. koa的源码
    - [预备](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter01/01.md)
    - [快速开始](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter01/02.md)
    - [application](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter01/03.md)
    - [request](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter01/04.md)
    - [response](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter01/05.md)
    - [context](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter01/06.md)

* 2. koa的中间件原理
    - [核心库-compose](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter02/01.md)
    - [洋葱模型](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter02/02.md)

* 3. koa的中间件设计
    - [中间件分类](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter03/01.md)
    - [请求/响应拦截](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter03/02.md)
    - [context挂载](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter03/03.md)
    - [间接中间件代理](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter03/04.md)
* 4. 自己写的一些中间件
    - [websocket](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter04/code/koa_websocket/app.js)
    - [upload-file](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter04/code/koa_upload-file/upload-file.js)
    - [static-server](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter04/code/koa_static-server/static-server.js)
    - [hook](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter04/code/koa_hook)

* 5. 基于koa封装的框架-egg
    egg框架主要做了以下事情:
    - 扩展四个基类(app, context, request, respond)中的方法
    - 引入插件机制
    - 固定了文件目录, 自动加载对应目录下的文件,并挂载到对应的对象(controller, middleware, router, extend)
    - 补充ws的支持
    - 引入多进程模型
    - 增加egg-mock的单元测试模块