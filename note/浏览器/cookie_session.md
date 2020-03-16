# 梳理cookie, session, 浏览器storage

## cookie
浏览器实现的一种数据储存功能, 大小有4kb限制, 可以设置时效  

保存时长设置: 
- max-age: 单位为秒, 具体值为cookie的生存周期, 默认值关闭浏览器即失效
- expries: 某个时间点(Tue, 15-Jan-2013 21:47:38 GMT)

应用场景:
1. 判断是否登陆过,或记录密码实现自动登录
2. 保存上次登录时间,查看页面,浏览计数等信息

缺点:
1. 默认不支持跨域获取(可以使用CORS或jsonp)
2. 每次请求都会携带cookie,会带来性能问题, 所以需要会有4kb的限制

## localStorage
5M以上, 不与服务器通信, 支持Object 和Array

特点:
1. 持久化储存在浏览器的数据


## sessionStorage
5M以上, 不与服务器通信, 支持Object 和Array

特点:
1. 页面会话期间可用, 页面/浏览器关闭后失效


## token
身份验证机制

由服务端生成(一般采用jwt方案), 递交给客户端保存的唯一标识, 每次请求都需要带上token供服务器校验用户. 

缺点:
1. 消耗计算时间, 每一次请求都需要解析token并验证相关信息
2. 如果放在cookie中, 无法跨域获取
3. token一旦发出, 后端无法强行使其作废


## session

用户会话过程中, 保存在服务器的数据.  sid 发送到客户端, 客户端接收后保存在cookie, 服务端可以通过cookie中的sid来获取服务器中的session.

应用场景:
1. 网上商城中的购物车
2. 保存用户登录信息, 供同一用户在不同页面使用

缺点: 
1. 消耗存储空间, 用户量大时空间消耗大
2. 分布式时需要同步session, 横向扩展不方便
3. 采用cookie保存sid的方式可能会有csrf(跨站请求伪造)的问题
4. 基于cookie保存sid的方式同样会有跨域的限制



### jwt (json web token)

常见的token生成方案, 格式: base64(header).base64(payload).sign
