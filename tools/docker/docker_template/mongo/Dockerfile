FROM mongo:latest

COPY mongo.conf /usr/local/etc/mongo/mongo.conf

# 这两个目录默认是 mongodb容器中 数据和日志存放的地方
VOLUME /data/db /data/configdb

CMD ["mongod"]
# 设置完数据库权限后, 可以设置为认证模式启动
# CMD ["mongod", "--auth"]

EXPOSE 27017
