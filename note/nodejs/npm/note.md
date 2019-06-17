## 记录npm常用的一些命令

- npm link
  
  在A模块内使用 `npm link` 可以把当前模块映射到全局
  在另外一个B模块内使用  `npm link A`, 可以全局中的A模块映射到B模块的node_module中

  通过`npm link` 结合package.json的bin属性, 可以使模块变成一个可执行命令. ps: 可能需要对生成的shell脚本进行修改.