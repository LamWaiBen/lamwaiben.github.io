# meta标签
常用于定义页面的说明, 关键字, 最后修改日期, 和其他元数据. 这些元数据服务于浏览器, 搜索引擎和其他网络服务

## 标签属性

### charset
文档编码格式  
```html
    <meta charset="UTF-8">
```
### content
与`name`或`http-equiv`属性配合使用, content作为它们的值.

### name

```html
<!-- 网页作者 -->
<meta name="author" content="Ben"/>
<!-- 网页地址 -->
<meta name="website" content="https://lamwaiben.com"/>
<!-- 网页版权信息 -->
 <meta name="copyright" content="2018-2019 demo.com"/>
<!-- 网页关键字, 用于SEO -->
<meta name="keywords" content="meta,html"/>
<!-- 网页描述 -->
<meta name="description" content="网页描述"/>
<!-- 搜索引擎爬虫规则，一般为all, index, follow -->
<meta name="robots" content="all" />

<!-- http请求头的referrer设置 -->
<meta name="referrer" content="origin">
<!-- 
    referrer参数详解:
    no-referrer: 不发送HTTP Referer 首部
    origin: 发送当前文档的 origin
    same-origin: 跨域请求时不发送 Referer
    no-referrer-when-downgrade:	浏览器默认行为, 当目的地是先验安全的(https->https)则发送 origin 作为 referrer ，
                                但是当目的地是较不安全的 (https->http)时则不发送 referrer.
 -->

<!-- 移动端常用视口设置 -->
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
<!-- 
  viewport参数详解：
  width：宽度（数值 / device-width）（默认为980 像素）
  height：高度（数值 / device-height）
  initial-scale：初始的缩放比例 （范围从>0 到10）
  minimum-scale：允许用户缩放到的最小比例
  maximum-scale：允许用户缩放到的最大比例
  user-scalable：用户是否可以手动缩放 (no,yes)
-->


<!-- 针对WebApp全屏模式，隐藏状态栏/设置状态栏颜色，content的值为default | black | black-translucent -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```


### http-equiv

```html
<!-- expires指定网页的过期时间。一旦网页过期，必须从服务器上下载。 -->
<meta http-equiv="expires" content="Fri, 12 Apr 2020 18:18:18 GMT"/>
<!-- 等待一定的时间刷新或跳转到其他url。下面1表示1秒 -->
<meta http-equiv="refresh" content="1; url=https://www.baidu.com"/>
<!-- 禁止浏览器从本地缓存中读取网页，即浏览器一旦离开网页在无法连接网络的情况下就无法访问到页面。 -->
<meta http-equiv="pragma" content="no-cache"/>
<!-- 也是设置cookie的一种方式，并且可以指定过期时间 -->
<meta http-equiv="set-cookie" content="name=value expires=Fri, 12 Apr 2001 18:18:18 GMT,path=/"/>
<!-- 使用浏览器版本 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

```