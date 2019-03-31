
## 记录学习koa2框架的源码,设计思路 ##


* 1. koa的源码
    - [预备](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter01/01.md)
    - [快速开始](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter01/02.md)
    - [application](https://github.com/lamwaiben/lamwaiben.github.io/tree/master/framework/koa/chapter01/03.md)
    - request
    - response
    - context

* 2. koa的原理
    - 核心库-compose
    - 洋葱模型

* 3. koa的中间件设计
    - 请求/响应拦截
    - context挂载
    - 间接中间件代理
* 4. 自己写的一些中间件 (todo)
    - websocket
    - upload-file
    - static-server
    - hook