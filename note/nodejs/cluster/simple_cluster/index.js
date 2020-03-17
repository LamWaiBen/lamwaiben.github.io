// 用 child_process 模拟 cluster

const numCPUs = require('os').cpus().length
const child_process = require('child_process')
const http = require('http');
const net = require('net')

const workers = {}
let id = 1;

for(let i = 0; i < numCPUs; i++) {
    workers[id++] = child_process.fork('./subprocess')
}

// TCP
const server = http.createServer()
server.on('connection', socket => {
    console.log('111111111111111')
    // socket.end('由父进程处理')
}).listen(8000, () => {
    for(let [id, worker] of Object.entries(workers)) {
        worker.send('server', server)
    }
})



// HTTP, 
// TODO 由于无法获取 req, res 对象, 只能借助socket把http协议格式的文本发送
// const server = http.createServer()
// server.listen(8000, () => {
//     for (let [id, worker] of Object.entries(workers)) {
//         worker.send('server', server)
//     }
// });


