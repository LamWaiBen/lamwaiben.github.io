const childProcess = require('child_process');
const net = require('net');

// 获取cpu的数量
const cpuNum = require('os').cpus().length;

let workers = [];
let cur = 0;

for (let i = 0; i < cpuNum; ++i) {
    workers.push(childProcess.fork('./worker.js'));
    console.log('worker process-' + workers[i].pid);
}

// 创建TCP服务器
const tcpServer = net.createServer();

tcpServer.listen(8989, () => {
    console.log('Tcp Server: 127.0.0.8989');
    // 监听端口后将服务器句柄发送给worker进程
    for (let i = 0; i < cpuNum; ++i) {
        workers[i].send(`tcpServer${i}`, tcpServer);
    }
    // 关闭master线程的端口监听
    tcpServer.close();
});