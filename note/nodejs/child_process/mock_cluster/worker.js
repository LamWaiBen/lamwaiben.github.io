// 接收主进程发来的消息
process.on('message', (msg, tcpServer, num) => {
    if (msg.match("tcpServer") && tcpServer) {
        tcpServer.on('connection', (socket) => {
            setTimeout(() => {
                socket.end('Request handled by worker-' + process.pid);
                (msg === "tcpServer0" || msg === "tcpServer1" || msg === "tcpServer2") && tcpServer.close();
            }, 100);
        })
    }
});