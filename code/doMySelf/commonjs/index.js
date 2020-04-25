const path = require('path')
const fs = require('fs')
const vm = require('vm')

const cache = {}
const templateFn = [
    '(function(require, module, exports) {',
    '})'
]

function customReuqire(pathToModule){
    let filePath = path.resolve(__dirname, pathToModule)
    
    // 引用到包含自己的模块时 使用原生的require
    if(filePath === path.resolve(__dirname, './index.js')) {
        return require(pathToModule)
    }
    
    if(cache[filePath]) return cache[filePath]
    
    let codeStr = templateFn[0] + fs.readFileSync(filePath) + templateFn[1]
    
    let code = new vm.runInThisContext(codeStr)
    
    // console.log('----------------------', codeStr)
    let customModule = { exports: {} }
    code(customReuqire, customModule, customModule.exports)
    cache[filePath] = customModule.exports


    return cache[filePath]
};



module.exports = customReuqire;