
/**
 * 静态资源服务器中间件 使用方法
 * import static_server from "./middlewares/static-server";
 * app.use(static_server({root: path.join(__dirname, '/dist')}))
 *
 */
'use strict'

import path from "path";
import fs from "fs";

import * as fsMethod from "../util/fsMethod";

/**
 * 静态服务
 * @param {*} options 
 */
function server(options){
    let { root } = options
    return async function (ctx, next) {
        let content = await getContent(ctx, root)
        // 解析请求内容的类型
        let mime = fsMethod.getMime(ctx.url)

        // 如果有对应的文件类型，就配置上下文的类型
        if (mime) ctx.type = mime

        // 输出静态资源内容
        if (mime && mime.indexOf('image/') >= 0) {
            // 如果是图片，则用node原生res，输出二进制数据
            ctx.res.writeHead(200)
            ctx.res.write(content, 'binary')
            ctx.res.end()
        } else {
            // 其他则输出文本
            ctx.body = content
        }
    }
}

/**
 * 获取静态资源内容
 * @param  {object} ctx koa上下文
 * @param  {string} 静态资源目录在本地的绝对路径
 * @return  {string} 请求获取到的本地内容
 */
async function getContent(ctx, fullStaticPath) {
    // 封装请求资源的完绝对径
    let reqPath = path.join(fullStaticPath, ctx.url)
    // 判断请求路径是否为存在目录或者文件
    let exist = fs.existsSync(reqPath)

    // 返回请求内容， 默认为空
    let content = ''

    if (!exist) {
        content = '404 Not Found!'
    } else {
        let stat = fs.statSync(reqPath)
        if (stat.isDirectory()) {
            //如果为目录，则渲读取目录内容
            content = dir(ctx.url, reqPath)
        } else {
            // 如果请求为文件，则读取文件内容
            content = await fsMethod.readFile(reqPath)
        }
    }
    return content
}

/**
 * 封装目录内容
 * @param  {string} url 当前请求的上下文中的url，即ctx.url
 * @param  {string} reqPath 请求静态资源的完整本地路径
 * @return {string} 返回目录内容，封装成HTML
 */
function dir(url, reqPath) {
    console.log('dir', url, reqPath)
    // 遍历读取当前目录下的文件、子目录
    let contentList = fsMethod.walk(reqPath)

    let html = `<ul>`
    for (let [index, item] of contentList.entries()) {
        html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a>`
    }
    html = `${html}</ul>`

    return html
}


export default server


