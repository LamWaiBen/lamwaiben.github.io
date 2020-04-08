# XSS 与 CSRF

## XSS
XSS: 是一种攻击者通过留言插入恶意JS脚本在dom中, 从而收集用户私隐, 持劫用户等, 利用用户对指定网站的信任(`DOM中携带的JS脚本也可以运行的特性`).

XSS攻击的实现有三种方式:
1. 存储型  
    把恶意代码存储到服务端数据库, 永久性的显示在其他用户的页面上.  
    常见场景: 用户留言板, 评论板.
2. 反射型  
    把恶意代码放在GET请求的参数中, 诱导用户点击.  
    常见场景: 群发的恶意URL链接
3. 文档型
    服务器返回的HTML文档在经过代理服务器的时候插入恶意代码.
    常见场景: 恶意wifi, 被入侵的代理服务器.

XSS的防范措施有四种:
1. 验证所有`输入`数据，有效检测攻击
2. 对所有`输出`数据进行适当的编码，以防止任何已成功注入的脚本在浏览器端运行
3. cookie设置`httpOnly: true`, 避免通过js获取到cookie信息
4. 使用 `内容安全策略 (CSP)`
    - 可以通过两种方式设置
      - http-header中设置`Content-Security-Policy: default-src 'self`
      - meta标签: `<meta http-equiv="content-security-policy" content="default-src 'self'">`
    - 具体指令
      - default-src
      - script-src
      - style-scr等等
----------------------------
## CSRF
CSRF:  是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法, 利用网站对用户浏览器的信任(`请求会自动携带cookie这个特性`).

CSRF防范措施主要有五种:
1. 服务端检验请求头的 `Referer` 字段, 判断请求来源地址是否正确, 但是请求头依然有可能被人为修改
2. 请求地址添加校验token, 在关键请求中加入一个不保存在cookie的token参数, 用于校验请求是否为本人处于自己意愿发送.
3. 设置在set-cookie中添加`SameSite`字段, 跨站时不发送
4. 不要使用GET请求, 尽量使用POST请求. GET请求的成本太低
5. 把token放在头部的自定义字段, 而不是放在cookie