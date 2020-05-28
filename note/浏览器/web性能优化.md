# Web性能优化

## 如何监测性能 



## 如何优化
分4个层面的优化:
1. 编码优化
    1.1 数据读取速度: 局部与全局变量, 原型链变量, 嵌套变量
    1.2 DOM: 减少DOM的获取/访问(缓存), 减少重绘重排(脱离文档流), 事件委托
    1.3 流程控制: 减少迭代次数, 使用map代替if-esle, 少用for...in(因为也会枚举原型)
2. 静态资源优化
    2.1 压缩资源体积
    2.2 雪碧图

3. 交付优化
    交付优化指的是对页面加载资源以及用户与网页之间的交付过程进行优化
    3.1 图片懒加载
    3.2 JS的异步无阻塞加载: script的defer/async, 可以放到head中
    3.3 优先加载关键CSS: 对首屏有影响的CSS优先加载
    3.4 perload: 需要引入外部媒体的资源可以设置perload
    3.4 提高交互效果: 适当分割函数, 引入缓冲动画, 避免用户感到长时间的运算无响应

4. 构建优化
    4.1 webpack的代码分割: 代码分割, 提高关键代码的加载速度
    4.2 SSR: 减少首次访问的白屏时间
    4.3 import: 使用ES6的import, 动态引入依赖,减少加载时间
    4.4 HTTP缓存头: 设置 expires 和 cache-control


5. 其他
    5.1 HTTP/2
    5.2 CDN


# 辅助分析工具

## chrome
查看[./chrome目录](./chrome)
- Performance
- Rendering
- Layers
- Memory
- JavaScript Profiler