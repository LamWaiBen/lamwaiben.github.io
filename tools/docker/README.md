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
    > docker run -dit xxx /bin/bash # xxx 为上一条命令运行得到的结果
    > docker container ls   # 查看运行中的容器
    > docker container stop xxx # xxx 为需要停止的容器id

5. 进入运行中的容器
    > docker container exec -it xxx /bin/bash # xxx 为上一条命令运行得到的结果



## Dockerfile

### Volume
Docker的Volume功能类似于Linux的Mount(挂载)功能, 允许将宿主的文件夹绑定到容器内
```
#方法一: 在命令设置
# 把当前目录的my-volume文件夹设置为容器的/mydata文件夹
docker run -it -v my-volume:/mydata alpine sh

# 但还有另一件只有-v参数能够做到而Dockerfile是做不到的事情就是在容器上挂载指定的主机目录。例如：
docker run -v /home/data:/data debian ls /data

方法二: 在Dockerfile设置
#Dockerfile
VOLUME:
 - my-volume:/mydata    # 效果与方法一一样
 - /foo                 # 相当于在宿主上创建一个匿名volume绑定到容器的/foo目录

```

## 更新镜像

1. 容器内的修改提交到镜像
    > docker commit -m="test update" -a="lwb" 96f1e0 hello-docker:1.0.1 # 会另外新生成一个镜像

## 修改映射端口
三种方法: 
1. 方法一: 删除原有容器, 重新建容器
2. 方法二: 修改容器配置文件, 重启docker服务  
    ```
    # 编辑配置
    vi /var/lib/docker/containers/[hash_of_the_container]/hostconfig.json

    # 重启docker服务
    systemctl restart docker
    ```
3. 方法三: 利用 commit 新构建镜像
    - 停止容器  
        ```
        docker stop container01
        ```
    - 提交该docker容器  
        ```
        docker commit container01 new_image:tag
        ```
    - 用前一步生成的新镜像重新启动容器  
        ```
        docker run --name container02 -p 80:80 new_image:tag
        ```

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
## 安装
```
# 方法一:
curl -L https://get.daocloud.io/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
# 方法二: 
curl -L https://github.com/docker/compose/releases/download/1.22.0/run.sh > /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

docker-compose -v
```

## 如何更新镜像
如果修改了容器中的Dockerfile, 可以使用以下命令重建镜像并更新到容器
```
docker-compose stop

docker-compose up -d --build        # --build 重建镜像
```

# 常见问题
## docker pull 官方镜像太慢
1. 可以直接从指定源获取镜像  
   ```
   docker pull registry.docker-cn.com/library/ubuntu:16.04
   ```
2. 可以通过修改配置, 使用国内的源来加速  
```
# /etc/docker/daemon.json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}

# 修改后重启服务
systemctl daemon-reload
systemctl restart docker
```
ps: 可以在[阿里云](https://cr.console.aliyun.com/cn-hangzhou/instances/source)临时创建一个加速源. 

## volumes 如何备份迁移
TODO

## 数据库如何在创建container时自动创建用户
TODO


# 参考

- [写给前端的Docker实战教程](https://zhuanlan.zhihu.com/p/83309276)
- [Docker部署前后端项目](https://juejin.im/post/5cce4b1cf265da0373719819)
- [在Docker中使用mysql数据库](https://www.cnblogs.com/areyouready/p/8948552.html)
- [这可能是网络上唯一一篇给前端写的Docker+Node+Nginx+Mongo的本地开发+部署实战](https://juejin.im/post/5ddb3f85e51d45231576af3c)
- [node 项目从构建到使用 jenkins + docker + nginx + mysql + redis 自动化部署](https://juejin.im/post/5dde46b2e51d4554350715f5)