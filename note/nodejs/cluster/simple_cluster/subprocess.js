process.on('message', (m, server) => {
    if (m === 'server') {
        // TCP
        // server.on('connection', socket => {
        //     console.log('connection, 22222222222')
        //     socket.write(`subprocess pid: ${process.pid}`)
        //     socket.end('由子进程处理');
        // });

        // HTTP
        // TODO, 由于child_process 默认并不支持传递 http server, 
        // 所以只能借助socket, 蹩脚的按照http协议格式发送文本, 实现http功能
        server.on('connection', socket => {
            console.log('connection, 22222222222')

            const data = `subprocess pid: ${process.pid}`;
            let msg = "HTTP/1.1 200 OK\r\n";
            msg += "Content-Type: text/html; charset=UTF-8\r\n";
            msg += "Content-Length: " + data.length + "\r\n\r\n";
            msg += data + "\r\n";
            socket.end(msg);
        });

        server.on('request', (req, res) => {
            console.log('request, 22222222222', req)
            res.end('由子进程处理')
        })
    }
});