# docker教程



## 打包镜像
0. 获取docker镜像
    ```
    docker pull nginx
    ```
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

## 使用mysql
1. 获取mysql镜像
    ```
    docker pull mysql:5.6
    ```
2. 启动mysql镜像
    ```
    docker run -itd -p 12345:3306 --name mysqlApp mysql:5.6 bash
    ```
3. 连接到mysqlApp容器
    ```
    docker exec -it mysqlApp bash
    ```
4. 启动mysql服务
    ```
    # 查看启动状态
    service mysql status

    # 命令启动
    service mysql start
    ```
5. 设置mysql, 使其可以通过外部连接使用
    ```
    #1 选择mysql表
    use mysql;

    #2 设置root账号密码
    update user set authentication_string = password('root') where user = 'root';

    #3 对root授权, 使其不只绑定在localhost上
    GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
    ```
6. 容器外使用mysql
    ```
    # 连接命令
    mysql -u root -h 0.0.0.0 -P 12345 -p
    ```


# 管理工具: docker-compose





## 参考

- [写给前端的Docker实战教程](https://zhuanlan.zhihu.com/p/83309276)
- [Docker部署前后端项目](https://juejin.im/post/5cce4b1cf265da0373719819)
- [在Docker中使用mysql数据库](https://www.cnblogs.com/areyouready/p/8948552.html)