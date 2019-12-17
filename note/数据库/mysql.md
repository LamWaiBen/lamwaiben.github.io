# mysql
记录mysql学习过程

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
    