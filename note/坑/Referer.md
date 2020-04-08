# 是 `Referer` 还是 `Referrer` ?

## 缘由
阅读文档的时候发现 `meta` 标签中的 name 属性中有一个熟悉的值 `referrer` , 用于设置HTTP请求头 `referer` 的默认值.  

这是时候就奇怪了, 这两个单次的拼写并不一样, 有一个 `r` 的差别, 难道是我眼花了吗?  

查资料后发现,  有一个用来表示页面或资源来源的请求头，由 `Philip Hallam-Baker` 于上世纪 90 年代提出来，他当时把这个请求头叫做`Referer`，并最终写进了 RFC1945，也就是 `HTTP/1.0` 协议.

有趣的是，当时这个单词被他拼错了，正确的拼写应该是`Referrer`。但是这个错误被发现之前，已经被大量使用，如果要改过来需要所有服务端、客户端的一致配合，还有大量的代码需要排查修改。于是，HTTP 的标准制定者们决定将错就错，不改了。  

由此可见, HTTP 标准的制定者奉行实用主义, 又不是不能用.  

导致这一错误延续到其他WebServer, 服务端语言或框架:  
- `Nginx`：ngx_http_referer_module - used to block access to a site for requests with invalid values in the "Referer" header field；

- `PHP`：$_SERVER['HTTP_REFERER'] - The address of the page (if any) which referred the user agent to the current page；

- `Django`：HttpRequest.META.HTTP_REFERER – The referring page, if any；

- `ThinkJS`：Controller.referer() - 获取 referer；


但是, 在JavaScript中, 浏览器们以及TC39比较齐心, 一起修正了错误的写法, 使用 `Referrer`.  

    document.referrer 

所以才会出现最初的疑问: 是 `Referrer` 还是 `Referer` ?
 
## 总结
- 一般涉及HTTP请求头的话, 需要使用 `Referer` 这种错误的拼法.
- 在HTML, JS环境中可以使用正确的拼法 `Referrer`.