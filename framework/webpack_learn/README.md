# 实现一个简单的webpack

## 目标
通过仿造webpack,学习打包软件背后的工作原理, 加深对模块化,自动化, AST树的理解, 思考如何通过这些提升平时的工作效率.


>目前已完成基本打包功能 [代码链接](https://github.com/LamWaiBen/learn-webpack)     
TODO: loader, 代码分割

## 分析
因为模块化开发的使用, 我们通常用到的'require'或'import xx from xx'来引用模块,而浏览器无法直接通过`require`来引用模块和 `export`来导出模块, 为了实现这两个功能, webpack将所有引用的文件转换成一个执行行的表达式, 并定义了`require`方法, 打包成一个JS文件, 浏览器引用这个文件即可

怎么做?

- 如何收集依赖?  通过AST树
- loader

- 依赖模块名如何替换成依赖模块id？
  
  读取ast树,搜集依赖模块名、依赖模块名的位置（起始，结束）, 在输出打包文件时用模块id替换掉

## 总结

- 输入文件得到AST树, 遍历AST树,可以收集到模块的依赖
- 学会如何抽象化整合模块
- 工程化的思想. 把代码看做文本内容, 用代码来分析文本内容,并对其处理输出；用代码来生成代码


## 测试

```
git@github.com:LamWaiBen/learn-webpack.git
cd learn-webpack
npm i
npm link
learn-webpack ./example/main.js
node ./example/output.js

//输出
//It"s module B!
//main It's module A
//It"s C

```



## todo

- loader
- 代码切片
- 依赖模块名替换成依赖id




