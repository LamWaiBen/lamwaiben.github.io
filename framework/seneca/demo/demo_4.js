// 创建微服务
// 1. warp方法的使用        2. 修改host/port        3. tcp连接

const seneca = require('seneca')()

const math = require('../model/math')


// 1. 测试warp方法包装的模式, 可以对入站参数修改
// seneca.use(math)
//     .act('role:math,cmd:sum,left:1,right:2', console.log)
//     .act({role:"math",cmd:"product",left:"1",right:"2"}, console.log)



// 2. 配置host & port  默认port: 10101

//seneca.client(8080) → seneca.listen(8080)
//seneca.client(8080, '192.168.0.2') → seneca.listen(8080, '192.168.0.2')
//seneca.client({ port: 8080, host: '192.168.0.2' }) → seneca.listen({ port: 8080, host: '192.168.0.2' })

// seneca.use(math).listen(80)

// test 
// http://localhost:80/act?role=math&cmd=sum&left=1&right=5   => {"answer":6}






// 3. tcp
// server
// seneca.use(math).listen({type: 'tcp'})

// client
seneca.use(math).client({type: 'tcp'})  
    .act({ role: "math", cmd: "product", left: "2", right: "2" }, console.log)

