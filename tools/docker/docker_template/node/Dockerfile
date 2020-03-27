FROM node:10.16.3-alpine

## 拷贝项目文件进行构建
WORKDIR /app/

# 单独把package.json 拷出来是为了把node_modules安装到自定义卷里
# (配合 node_modules:/app/node_modules 使用)
COPY ./package.json ./
RUN npm install --registry=https://registry.npm.taobao.org

# 把代码文件也复制出来
COPY ./* /app/

CMD ["npm","run","dev"]

EXPOSE 7001
