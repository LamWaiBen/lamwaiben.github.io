
/**
 * 由于nodejs中很多函数都是异步执行，在回调中返回结果（错误先行）， 所以我们可以把异步操作promise化
 * 把nodejs中的api改造成promise
 * @param {nodejsCallBack API} api 
 */
function promisify(api){
    return (...args) => {
        return new Promise((resolve, reject) =>{
            args.push((err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
            api.apply(null, args)
        })
    }
}

// test case
let fs = require('fs')
let readFile = promisify(fs.readFile)
readFile("./README.md", 'utf-8').then(data =>{
    console.log('readFile data:', data)
}, err => {
    console.error('readFile error:', err)
})