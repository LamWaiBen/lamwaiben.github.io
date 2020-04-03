/**
 * ajax主要分四步:
 * 1. 初始化参数
 * 2. 创建xhr对象
 * 3. 设置回调, 判断 readyState 和 status
 * 4. 发送请求, 
 *    4.1 先建立连接xhr.open(method, url, async) 
 *    4.2 然后设置请求头 
 *    4.3 最后发送请求 xhr.send(data)
 */

function ajax(options){
    // 1. 初始化参数 
    let { 
        method = "GET",  
        params,
        data,
        url,
        async,
        success,
        headers
    } = options

    if (method == "GET" && params){
        if (url[url.length - 1] != '?') url += "?"
        url += Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    }
    async = async === false ? false : true  // 只有严格传入false的时候才是 非异步

    // 2. 创建 xhr对象
    let request = null
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest()
    } else {
        request = new ActiveXObject('Microsoft.XMLHTTP')
    }
    
    // 3. 设置回调
    request.onreadystatechange = function(){
        /**
        readyState:
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪

        status: HTTP 状态码
        **/
        if (request.readyState === 4 && (request.status >= 200 || request.status < 300)) {
            success && success(request.responseText)
        }
    }

    // 4. 初始化请求/建立连接, 发送请求
    request.open(method, url, async)    // 建立连接
    if(headers){
        Object.keys(headers).forEach(key => {
            request.setRequestHeader(key, headers[key])
        });
    }
    method === 'GET' ? request.send() : request.send(data)

}

// 测试
ajax({
  method: 'GET',
  url: '',
  success (res) {
    console.log('success', res);
  },
  async: true,
  params: {
    // p: 'test',
    // t: 666
  },
  headers: {
    'Accept': 'application/json'
  }
})