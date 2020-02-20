// 前端部分
// jsonp的回调函数, 在后台返回的js文件中调用并传入数据
function foo(result){
    console.log(`jsonp callback, result: ${result}.`)
}
// jsonp发起
function jsonp(callback, a, b){
    let head = document.getElementsByTagName('head')[0]
    let js = document.createElement('script')
    js.scr = `http://domain:port/jsonp?a=${a}&b=${b}&callback=${callback.name}`
    head.appendChild(js)    // 插入DOM之后自动发送请求
    // 当后台返回js文件时, 则会自动执行里面的内容
}
jsonp(foo, 1, 2)
// foo(3)


// 后台部分
// 示例返回js文件, 其中内容为: 'foo(3)'
function handleJSONP(callback, a, b){
    let result = a + b
    return `${callback}(${result})`
}