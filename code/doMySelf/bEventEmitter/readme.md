# 实现一遍EventEmitter
基于nodejs的的实现, 自己做一个在浏览器也可以使用的EventEmitter.



## 踩坑
1. 严格模式下判断不存在的变量  
    
    严格模式下不能用 `||` 操作符来兼容不存在的变量, 因为报错变量不存在.  
    只能利用 `typeof xxx === undefined` 来变量是否存在.

2. 浏览器中模块导出要注意节点id  

    由于在浏览器中用id创建的节点, 会同时创建全局变量, 所以需要判断 `exports` 和 `module` 是否已经被节点变量占用的情况.

    ```javascript
    if (typeof exports != 'undefined' && !exports.nodeType) {
        // 避免 <div id="exports"> </div> 的情况
        if(typeof module != 'undefined' && !module.nodeType) {
            // 避免 <div id="module"> </div>
        }
    }

    ```