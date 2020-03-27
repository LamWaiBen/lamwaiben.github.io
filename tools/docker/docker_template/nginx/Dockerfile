FROM nginx:alpine

# 拷贝nginx全局配置文件, 其他文件夹则通过映射的方式传到容器内
COPY nginx.conf /etc/nginx/

# apk国内源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/' /etc/apk/repositories

# 安装nginx
RUN apk update \
    && apk upgrade \
    && apk add --no-cache openssl \
    && apk add --no-cache bash
    
# 创建账号, nginx.conf中改为使用root账号, 否则会有权限问题
# RUN set -x ; \
#     addgroup -g 1000 -S www-data ; \
#     adduser -u 1000 -D -S -G www-data www-data && exit 0 ; exit 1
    
CMD nginx

EXPOSE 80 443
