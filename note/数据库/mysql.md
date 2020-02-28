# mysql
记录mysql学习过程

## 安装
1. 先检查是否已安装mysql  
    检查是否已安装:
    > rpm -qa | grep mysql  

    如果已经安装, 那可以选择卸载: 
    > rpm -e mysql　　// 普通删除模式  
    > rpm -e --nodeps mysql　　// 强力删除模式

2. 安装mysql
    > wget https://repo.mysql.com/mysql80-community-release-el7-3.noarch.rpm  
    > rpm -ivh mysql-community-release-el7-5.noarch.rpm   
    > yum install mysql-server  
3. 权限设置  
    设置权限:  
    > chown mysql:mysql -R /var/lib/mysql  

    初始化: 
    > mysqld --initialize  

    启动MySQL等相关指令:   
    > systemctl start mysqld    // 启动  
    > systemctl stop mysqld     // 停止  
    > systemctl restart mysqld  // 重启  
    > systemctl status mysqld   // 查看运行状态  
    > systemctl enable mysqld   // 设置开机启动
4. 登入  
    查看初始密码:  
    > grep "password" /var/log/mysqld.log  

    连接MySQL服务器:  
    > mysql -u root -p  

    创建root用户的密码:  
    > mysqladmin -u root password "new_password";


## mysql类型
### int类
类型         | 　占用字节数　  | 有符号取值范围             | 无符号取值范围 
-------------|---------------|---------------------------|---------------
tinyint      | 1bytes/8bit   | -128 ~127                 | 0 ~ 2^8-1 
smallint     | 2bytes/16bit  | -32768 ~ 32767            | 0 ~ 2^16-1 
mediumint    | 3bytes/24bit  | -8388608 ~ 8388607        | 0 ~ 2^24-1 
int          | 4bytes/32bit  | -2147483648 ~ 2147483647  | 0 ~ 2^32-1 
bigint       | 8bytes/64bit  | -2^63 ~ 2^63-1            | 0 ~ 2^64-1 

## mysql表的创建

- zerofill：当插入的数值比定义的属性长度小的时候，会在数值前面进行补值操作。  
    ```
    zerofill:通常用于流水订单号的生成. 自动补全订单位数
    1、创建表
    create table table_name (
        id bigint(20) NULL,
        order_no int(6) unsigned zerofill NULL
    );

    2、插入数据：
    INSERT INTO table_name VALUES(2,5)

    3、查数据：
    SELECT * FROM table_name

    运行结果为：000005
    ```

## mysql终端命令

- 修改密码
    ```
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '我是密码';
    ```
    MySQL8.0.4之前的密码认证插件是"mysql_native_password",  8.0.4之后为"caching_sha2_password"
    