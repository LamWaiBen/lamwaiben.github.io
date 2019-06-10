


/**
 * 上传文件中间件
 * 使用方法:
 * 
 * 后端:
 * import upload_file from "./middlewares/upload-file";
 * router.post('/upload', upload_file(options))
 * 
 * 前端:   * 必须要设置 enctype="multipart/form-data"
 *  <form action="/upload" method="post" enctype="multipart/form-data">
        <label for="file-name">filename</label>
        <input id="file-name" type="text" name="filename">
        <input type="file" name="upload">
        <input type="submit" value="submit">
    </form>
 */

import path from "path";
import fs from "fs";
import { inspect } from "util";

import Busboy from "busboy";

import * as fsMethod from "../util/fsMethod";


/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */

function uploadFile(options){
    // 获取类型
    let fileType = options.fileType || 'common'
    let filePath = path.join(options.path, fileType)
    let mkdirResult = fsMethod.mkdirsSync(filePath)

    return async function(ctx){
        let req = ctx.req
        let res = ctx.res
        
        let result = {
            success: false,
            formData: {},
        }
        result = await new Promise((resolve, reject) => {
            let busboy = new Busboy({ headers: req.headers })
            console.log('文件上传中...')

            // 解析请求文件事件
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                let fileName = Math.random().toString(16).substr(2) + '.' + fsMethod.getSuffixName(filename)
                let _uploadFilePath = path.join(filePath, fileName)
                let saveTo = path.join(_uploadFilePath)

                // 文件保存到制定路径
                file.pipe(fs.createWriteStream(saveTo))

                // 文件写入事件结束
                file.on('end', function () {
                    result.success = true
                    result.message = '文件上传成功'

                    console.log('文件上传成功！')
                    ctx.body ="end scuess"
                    resolve(result)
                })
            })

            // 解析表单中其他字段信息
            busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
                result.formData[fieldname] = inspect(val);
            });

            // 解析结束事件
            busboy.on('finish', function () {
                console.log('文件上结束')
                ctx.body = "finish scuess"
                resolve(result)
            })

            // 解析错误事件
            busboy.on('error', function (err) {
                console.log('文件上出错')
                reject(result)
            })

            req.pipe(busboy)
        })

        return result
    }
}


export default uploadFile