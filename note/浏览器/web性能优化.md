# Web性能优化

## 如何监测性能 
### performance的几个阶段
- domLoading
  - 开始解析DOM树
- domInteractive
  - DOM树解析完毕
- domContentLoadedEventStart
  - 资源加载开始
- domContentLoadedEventEnd
  - 资源加载结束
- domComplete
  - DOM树及资源加载完毕
- loadEventStart
  - 开始执行load事件
- loadEventEnd

### 几个时间的计算
- 重定向耗时 = redirectEnd - redirectStart;

- DNS查询耗时 = domainLookupEnd - domainLookupStart;

- TCP链接耗时 = connectEnd - connectStart;

- HTTP请求耗时 = responseEnd - responseStart;

- 解析dom树耗时 = domComplete - domInteractive;

- 白屏时间 = responseStart - navigationStart;

- DOMready时间 = domContentLoadedEventEnd - navigationStart;

- onload时间 = loadEventEnd - navigationStart;



## 如何优化
分4个层面的优化:
1. 网络优化
   1. 使用CDN
   2. 使用缓存(cookie, localstorage, indexedDB, serviceWorker)
   3. 升级HTTP/2.0
2. 资源优化
   1. 雪碧图
   2. js代码混淆压缩和treeShanking
   3. 压缩字体/图片体积(使用体积更小的格式)
   4. 开启gzip
3. 编码优化
   1. 图片懒加载
   2. 减少重绘重排
   3. 首屏时间调整资源位置(CSS, script)
   4. js的加载
      1. import()按需动态引入(识别兼容性加载profile)
      2. defer和async减少阻塞
   5. 事件委托, 引入缓冲动画, 时间切片等
4. 框架优化
   1. SSR优化
   2. 骨架屏



# 辅助分析工具

## chrome
查看[./chrome目录](./chrome)
- Performance
- Rendering
- Layers
- Memory
- JavaScript Profiler