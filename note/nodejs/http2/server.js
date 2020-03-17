const http2 = require('http2')
const fs = require('fs')

const server = http2.createSecureServer({
    key: fs.readFileSync('private.pem'),
    cert: fs.readFileSync('cert.pem')
})

server.on('error', err => console.error(err))

server.on('stream', (stream, headers) => {
    stream.respond({
        'content-type': 'text/html',
        ':status': 200
    })

    stream.write('ben')

    stream.end('<p>hello http2!</p>')

})

server.listen(8443);

// 创建密钥与证书
// window环境需要把'/' 改成'//'
// openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout private.pem -out cert.pem