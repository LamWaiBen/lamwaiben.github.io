# docker教程



## 打包镜像
1. 创建 Dockerfile
    ```
    cd hello-docker
    # Dockerfile
    FROM nginx

    COPY ./index.html /usr/share/nginx/html/index.html

    EXPOSE 80
    ```
2. 打包镜像
    在当前目录输入命令:
    > docker image build ./ -t project_name:1.0.0       

    基于路径 `./` 打包一个镜像, 镜像名称`project_name`, 版本号是`1.0.1`

    打包成功后可以使用下面指令 `查看本机已有镜像`
    > docker images

3. 创建容器
    > docker container create -p 2333:80 hello-docker:1.0.0  
    > #返回结果 96f1e00ac120e08e8bc61a94edc6e05e4323f53b85153c73824f984b4acf6842

4. 启动已创建的容器
    > docker container start xxx # xxx 为上一条命令运行得到的结果
    > docker container ls   # 查看运行中的容器
    > docker container stop xxx # xxx 为需要停止的容器id

5. 进入运行中的容器
    > docker container exec -it xxx /bin/bash # xxx 为上一条命令运行得到的结果


## 更新镜像

1. 容器内的修改提交到镜像
    > docker commit -m="test update" -a="lwb" 96f1e0 hello-docker:1.0.1 # 会另外新生成一个镜像



# 管理工具: docker-compose





## 参考

- [写给前端的Docker实战教程](https://zhuanlan.zhihu.com/p/83309276)