## 记录npm常用的一些命令

- npm link        
  
    在A模块内使用 `npm link` 可以把当前模块映射到全局
    在另外一个B模块内使用  `npm link A`, 可以全局中的A模块映射到B模块的node_module中

    通过`npm link` 结合package.json的bin属性, 可以使模块变成一个可执行命令. ps: 可能需要对生成的shell脚本进行修改.


- npx       
    1. 调用项目安装的模块       
        可以执行到模块中定义的指令(package.json中的scripts)      
        ```
            # 以前
            $ node-modules/.bin/mocha --version

            # 现在
            $ npx mocha --version
        ```
        相当于 `npx` 自动到 "node_modules/.bin" 路径下去检查命令是否存在    

    2.  避免全局安装模块    
    
        > npx create-react-app my-app      

        npx 把 create-react-app 下载到一个临时文件夹, 待安装完毕后把临时文件夹删除

    3. 执行远程源码(依赖package.json))
        ```
        # 执行 Gist 代码
        $ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

        # 执行仓库代码
        $ npx github:piuccio/cowsay hello
        ```
