## mysql终端命令

- 修改密码
    ```
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '我是密码';
    ```
    MySQL8.0.4之前的密码认证插件是"mysql_native_password",  8.0.4之后为"caching_sha2_password"
    