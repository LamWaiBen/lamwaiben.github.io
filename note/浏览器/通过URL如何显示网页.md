# 通过URL如何显示网页
从输入URL到页面呈现发生了什么？  
可以从两个阶段说起: 1. 网络请求; 2. HTML渲染

## 网络请求
### 1. 根据URL构造HTTP请求
示例请求行  

    GET URL HTTP/1.1

### 2. 查找`强缓存`
若缓存命中, 跳过后面的步骤, 进入HTML渲染阶段.  
[如何查找强缓存](./请求缓存)

### 3. DNS解析
我们通常输入的URL是域名, 而数据包的传输其实是以`IP`地址来收/发的.   
DNS(域名系统)可以通过域名, 帮我们找到对应机器的IP地址.  

### 4. TCP连接


### 5. 发送HTTP请求

### 6. 返回响应, 进入HTML解析阶段


## HTML渲染

### 1. 构建DOM树
构建DOM树时的阻塞关系: 
- CSS不会阻塞DOM解析, 但是会阻塞渲染, 因为CSS加载完以后需要重新渲染
- CSS会阻塞JS的执行, 因为有可能JS中会获取DOM元素的样式, 
- JS会阻塞DOM的解析和渲染, 因为JS中会获取DOM元素

### 2. 结合DOM树和CSSOM树, 生成Render树
PS: 现在几乎都不生产Render树了, 而是计算DOM树上的元素, 把匹配的CSS属性标记在元素上
通过计算节点的几何信息生成Layout树

### 3. 遍历Render树计算几何信息, 生成Layout树
在chrome dev tools 的 Rendering 功能可以查看:
- 几何布局信息
- 重排区域
- 重绘区域

### 4. 生成绘制列表
绘制不同的盒模型, 有可能会得到很多图层

### 5. 图层合成, 生成Layer树
在chrome dev tools 的 Layers 功能可以查看到图层信息  
把较为简单的图层(仅含transform等属性的)合成一层, 然后交由浏览器渲染图像  



# 参考
[更快地构建 DOM: 使用预解析, async, defer 以及 preload](https://www.zcfy.cc/article/building-the-dom-faster-speculative-parsing-async-defer-and-preload-x2605-mozilla-hacks-8211-the-web-developer-blog-4224.html?t=new)
[Inside a super fast CSS engine: Quantum CSS](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/)