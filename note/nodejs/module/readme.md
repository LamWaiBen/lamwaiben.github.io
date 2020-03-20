# 模块

## CommonJS

### CommonJS的假设实现:
```javascript
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // 模块代码在这。在这个例子中，定义了一个函数。
    function someFunc() {}
    exports = someFunc;
    // 此时，exports 不再是一个 module.exports 的快捷方式，
    // 且这个模块依然导出一个空的默认对象。
    module.exports = someFunc;
    // 此时，该模块导出 someFunc，而不是默认对象。
  })(module, module.exports);
  return module.exports;
}
```

从实现原理可以知道2个特点:
1. CommonJs输出的值是浅拷贝的   
    ```javascript
    // a1.js
    let a = 1
    module.exports = a
    setTimeout(() => a = 2, 500)

    // index.js
    let a = require('./a1.js')
    setTimeout(() => console.log(a), 1000)      // 输出: 1


    // 对象内的属性可以正确获取, 说明是浅拷贝
    // a2.js
    var dog = {
        name: 'dog', 
    };
    module.exports = dog;

    setTimeout(() => dog.name = 'cat', 500);

    // index.js
    const dog = require('./a2.js')
    console.log(dog)                        // { name: 'dog'}
    setTimeout(() => console.log(dog), 1000)  //{ name: 'cat'}

    ```

2. module.exports 和 exports 的关系  

    两者的关系相当于在每个模块文件之前默认 `let exports = module.exports`
    ```javascript
    // 正确用法
    const a = {a: '11'}
    module.exports = a
    // 等价于
    exports.a = '11'

    // 错误用法
    // 注意: 如果直接对exports赋值, 则会使module.exports的引用丢失, 从而无法暴露模块
    exports = a     // 会使引用丢失

    //people.js
    module.exports = {name: '萤火虫叔叔'}；
    exports = {name: '萤火虫老阿姨'};

    //main.js
    let people = require('./people');
    console.log(people);//输出：{name: '萤火虫叔叔'}
    ```

## ES6的模块标准
1. ES6模块输出的是值引用, 且无法在引用者中修改ES6的引用声明的值(相当于const)  
    ```javascript
    // a.js
    export var a = 1

    // index.js
    import { a } from './a.js'    // 相当于 const 声明变量
    a = 2   // 报错 

    ```
