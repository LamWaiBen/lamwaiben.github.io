## child_process

### 创建子进程的方法

1. fork  
    > child_process.fork(modulePath[, args][, options])

2. spawn
    > child_process.spawn(command[, args][, options])  
    
    options.detached: true, 可以使父进程退出后,子进程继续运行.

3. exec
    > child_process.exec(command[, options][, callback])

4. execFile
    > child_process.execFile(file[, args][, options][, callback])

### subprocess  

1. send方法可以发送 `net.Server`
    > subprocess.send(message[, sendHandle[, options]][, callback])

    ```javascript
    //sendHandle 参数可用于将一个 TCP server 对象的句柄传给子进程，如以下示例所示：

    const subprocess = require('child_process').fork('subprocess.js');

    // 打开 server 对象，并发送该句柄。
    const server = require('net').createServer();
    server.on('connection', (socket) => {
    socket.end('由父进程处理');
    });
    server.listen(1337, () => {
    subprocess.send('server', server);
    });
    //子进程接收 server 对象如下：

    process.on('message', (m, server) => {
    if (m === 'server') {
        server.on('connection', (socket) => {
        socket.end('由子进程处理');
        });
    }
    });

    ```



2. send方法可以发送 `net.Socket`
    ```javascript
    // 类似地， sendHandle 参数可用于将 socket 的句柄传给子进程。 以下示例衍生了两个子进程，分别用于处理 "normal" 连接或优先处理 "special" 连接：

    const { fork } = require('child_process');
    const normal = fork('subprocess.js', ['normal']);
    const special = fork('subprocess.js', ['special']);

    // 开启 server，并发送 socket 给子进程。
    // 使用 `pauseOnConnect` 防止 socket 在被发送到子进程之前被读取。
    const server = require('net').createServer({ pauseOnConnect: true });
    server.on('connection', (socket) => {

    // 特殊优先级。
    if (socket.remoteAddress === '74.125.127.100') {
        special.send('socket', socket);
        return;
    }
    // 普通优先级。
    normal.send('socket', socket);
    });
    server.listen(1337);
    // subprocess.js 会接收该 socket 句柄作为传给事件回调函数的第二个参数：

    process.on('message', (m, socket) => {
    if (m === 'socket') {
        if (socket) {
        // 检查客户端 socket 是否存在。
        // socket 在被发送与被子进程接收这段时间内可被关闭。
        socket.end(`请求使用 ${process.argv[2]} 优先级处理`);
        }
    }
    });


    ```


    ### 使用 fork 模拟 cluster
    [参考](./mock_cluster/master.js) 

    