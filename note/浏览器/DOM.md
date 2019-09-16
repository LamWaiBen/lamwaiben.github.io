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
        console.log( lis_1.length, lis_1 ); // 6, <HTMLCollection>  动态集合
        console.log( lis_2.length, lis_2 ); // 3, <NodeList>        静态集合, 不再改变
    ```


