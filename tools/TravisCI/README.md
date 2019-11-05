# 持续集成 Travis CI

Travis CI 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。

持续集成指的是只要代码有变更，就自动运行构建和测试，反馈运行结果。确保符合预期以后，再将新代码"集成"到主干。


# 用法

## .travis.yml
项目根目录下必须包含 `.travis.yml` 配置文件, 而且必须要保存在Github仓库里, 一旦仓库有新的commit, Travis就找到这个配置文件, 执行里面的命令
```
# .travis.yml
language: node_js  # 运行环境
node_js:           # 执行nodejs版本
  - "8"         
sudo: required     # 是否需要sudo权限
before_install:    # 安装前所需要执行的代码
  - cnpm i
install: true      # 安装依赖, 为true时不执行任何脚本
script:            # 运行脚本 
  - npm run build
  - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  - docker build -t xxx:latest .
  - docker push xxx:latest          # 把docker镜像推到docker远程服务器

services:          # 指定服务
  - docker

env:               # 定义环境变量
  - DB=postgres
  - SH=bash
  - PACKAGE_VERSION="1.0.*"

deploy:            # 部署github pages
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN  # Set in the settings page of your repository, as a secure variable
  keep_history: true
  on:
    branch: master

```


## 钩子方法
- before_install：install 阶段之前执行
- before_script：script 阶段之前执行
- after_failure：script 阶段失败时执行
- after_success：script 阶段成功时执行
- before_deploy：deploy 步骤之前执行
- after_deploy：deploy 步骤之后执行
- after_script：script 阶段之后执行


## 运行状态
Travis 每次运行，可能会返回四种状态。       

- passed：运行成功，所有步骤的退出码都是0
- canceled：用户取消执行
- errored：before_install、install、before_script有非零退出码，运行会立即停止
- failed ：script有非零状态码 ，会继续运行