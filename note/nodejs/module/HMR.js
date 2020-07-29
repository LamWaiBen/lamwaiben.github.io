const fs = require('fs')

let routes = require('./routes/index')  // 热更新文件

app.use('/', (req, res, next) => {
    routes(req, res, next)
})

fs.watch(require.resolve('./routes/index'), () => {
    cleanCache(require.resolve('./routes/index'))
    try {
        routes = require('./routes/index')
    } catch (error) {
        console.error('module hmr failed!')
    }
})

function cleanCache(modulePath) {
    const module = require[modulePath]
    if(module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1)
    }
    require.cache[modulePath] = null    
}


/**
 * 思路:
 * 1. 热更新的模块以函数的方式来使用
 * 2. 文件变化时, 清空缓存(require.cache[modulePath]), 重新require拿到模块函数 
 * 
 */