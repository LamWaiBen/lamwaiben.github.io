// 发起TCP请求
const net = require('net')

for (let i = 0; i < 1e2; i++) {
    net.connect({
        port: 8000,
        onread: {
            // 为套接字的每次读取复用 4KiB 的 Buffer。
            buffer: Buffer.alloc(4 * 1024),
            callback: function (nread, buf) {
                // 收到的数据在 `buf` 中可用，从 0 到 'nread`。
                console.log(buf.toString('utf8', 0, nread));
            }
        }
    });
}