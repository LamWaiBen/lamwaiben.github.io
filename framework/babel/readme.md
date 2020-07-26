## Babel
`Babel`默认情况下只转换新的JavaScript语法(关键字: async/await, let, const)， 而不转换新的API。 例如Iterator、 Generator、 Map、 Set、 Promise、 Proxy等全局对象， 以及一些定义在全局对象上的方法（Object.assign）。  
如果需要使用这些新的对象和方法， 则需要引入 `polyfill`（垫片）。  

有两种引入方式:  polyfill 和 runtime 

### babel-polyfill
通过改写全局prototype的方式实现, 会加载整个polyfill, 最对编译的代码中的新API进行处理, 并在代码中插入帮助函数.
1. 解决了Babel不转换新API的问题, 但是全局加载的方式污染了全局环境
2. 不同的代码文件中包含重复的代码, 导致编译后的体积变大
3. 不适合写库, 因为会污染使用者的环境

### babel-runtime
把工具函数的代码转换成require语句, 全局加载的方式改为类似于按需加载(运行时依赖)
1. 通过手动在文件的头部引入模块
2. 适合开发库,工具包, 因为不会污染全局环境
3. 使用plugin自动require

#### babel-plugin-transform-runtime
解决了手动require的痛苦, 分析ast在模块顶部插入需要的垫片
1. 自动插入require的babel-runtime
2. 根据`.babelrc`中的设置, 检查需要兼容的版本, 自动转换为兼容版本的代码