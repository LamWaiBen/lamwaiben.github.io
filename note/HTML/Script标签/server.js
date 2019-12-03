const http = require("http");
const fs = require('fs')
http.createServer(function (req, res) {
    console.log(req.url)
    let path = req.url == "/" ? "./index.html" :  "." + req.url
    if(!fs.existsSync(path)) return
    if(path.match(/mjs$/)){
        // 设置模块文件的正文类型
        res.setHeader("content-type", "text/javascript")
    }
    let stream = fs.createReadStream(path)
    stream.on('data', chunk => {
        res.write(chunk)
    })
    stream.on('end', () => {
        res.end()
    })

}).listen(80);