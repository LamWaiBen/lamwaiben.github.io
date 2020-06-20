## 记录npm常用的一些命令

- npm源
  - 设置全局淘宝源
    ```
    npm config set registry https://registry.npm.taobao.org
    ```

- cnpm

    - cnpm: 类似于monorepo的管理方式
        
        - 把模块的依赖包提升到上层文件夹, 以减少重复模块安装
    - monorepo: 

        - lerna: 一个用来优化托管在git\npm上的多package代码库的工作流的一个管理工具,可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题。

          ```
          .
          ├── packages
          │      ├─ module-a
          │      │    ├─ src            # 模块 a 的源码
          │      │    └─ package.json   # 自动生成的，仅模块 a 的依赖
          │      └─ module-b
          │           ├─ src            # 模块 b 的源码
          │           └─ package.json   # 自动生成的，仅模块 b 的依赖
          ├── tsconfig.json             # 配置文件，对整个项目生效
          ├── .eslintrc                 # 配置文件，对整个项目生效
          ├── node_modules              # 整个项目只有一个外层 node_modules
          └── package.json              # 包含整个项目所有依赖
          ```

          所有全局配置文件只有一个，这样不会导致 IDE 遇到子文件夹中的配置文件，导致全局配置失效或异常。`node_modules` 也只有一个，既保证了项目依赖的一致性，又避免了依赖被重复安装，节省空间的同时还提高了安装速度。

          **兄弟模块之间通过模块 `package.json` 定义的 `name` 相互引用，保证模块之间的独立性，但又不需要真正发布或安装这个模块，通过 `tsconfig.json` 的 `paths` 与 `webpack` 的 `alias` 共同实现虚拟模块路径的效果。**

- npm link        
  
    在A模块内使用 `npm link` 可以把当前模块映射到全局  
    在另外一个B模块内使用  `npm link A`, 可以全局中的A模块映射到B模块的node_module中  
    通过`npm link` 结合package.json的bin属性, 可以使模块变成一个可执行命令. ps: 可能需要对生成的shell脚本进行修改.  
    注意: 其中bin属性所指向的文件就是执行的js文件, js的文件必须以`#!/usr/bin/env node\n`开头, 以解决node路径没有添加到系统的PATH中的问题以及`\n`解决js的编码问题


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
