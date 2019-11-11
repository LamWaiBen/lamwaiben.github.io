# DOM

## 选择器

1. getXXXByXXX 获取的是动态集合，querySelector获取的是静态集合。
    ```
        <ul>
            <li>aaa</li>
            <li>ddd</li>
            <li>ccc</li>
        </ul>
         
        // test
        var ul = document.getElementsByTagName('ul')[0],
        lis_1 = ul.getElementsByTagName("li");
        lis_2 = ul.querySelectorAll("li");
        for(var i = 0; i < 3 ; i++){ 
            ul.appendChild(document.createElement("li")); 
        } 
        console.log( lis_1.length, lis_1 ) // 6, [<HTMLCollection> x 6] 动态集合, 会自动增加
        console.log( lis_2.length, lis_2 ) // 3, [<NodeList> x 6]    静态集合, 不再改变
    ```

    推荐使用querySelector, 避免不可靠的动态变化


## url、src、href、rel、 uri 的定义与区别

1. url: 统一资源定位器
    - 是uri的一种具体实现, 是uri的子集, 代表资源的路径地址,
    - 格式:  协议类型:[//服务器地址[:端口号]][/资源层级UNIX文件路径]文件名?查询

2. src(引入): 指向外部资源的位置，指向的内容将会应用到文档中当前标签所在位置。
    - src 用于替换当前内容, 页面加载和解析会暂停
    - 使用src的标签: &lt;script&gt; , &lt;img&gt;
    - ```
        <script src="script.js"></script>   所以js需要放底部加载
        <img src="./img.png">>
      ```
3. href(引用): 指定网络资源的位置，从而在当前元素或者当前文档和由当前属性定义的需要的锚点或资源之间定义一个链接或者关系。
    - href 用于在当前文档和引用资源之间确立联系, 页面解析不会暂停
    - 使用href的标签: &lt;link&gt; 
    - ```
        <link href="style.css ref="stylesheet">
      ```
4. rel：用于定义链接的文件与HTML文档之间的关系.
    - StyleSheet: 表示是样式调用

5. uri: 统一资源标识符
    - 包括 url 和 urn