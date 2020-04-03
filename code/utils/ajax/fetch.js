/* 
基于fetch封装的http请求方法
fetch与ajax的主要区别:
1. 当收到一个代表错误的HTTP状态码时(即使是404或500), fetch()返回的promise不会被标记为reject, 
    仅当网络故障或请求被阻止时, 才会被标记为reject 
2. fetch()不会接受跨域cookies, 其他网站的Set-Cookie头部字段会被无视.
3. fetch不会默认发送cookies, 除非使用了credentials的初始化选项.

fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
*/

async function fetchHttp(options){
    try {
        let {
            url = '',
            data = {},
            method = 'GET',
            headers = {},
            mode = 'cors',
        } = options

        let requestConfig = {
            // credentials 与 XHR中的 withCredentials 类似, 表示请求是否携带cookie
            // 跨域请求时, 使用 include 模式的话服务器需要判断请求来源且允许 
            // ctx.set('Access-Control-Allow-Origin', '指定源')
            // ctx.set('Access-Control-Allow-Credentials', 'true')

            // credentials: 'omit',      // omit(default), same-origin, include
            method,
            headers: headers
            mode,
            // cache: 'force-cache',
        }

        if(method == 'GET') {
            let queryStr = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
            if(queryStr){
                url = url + "?" + queryStr
            }
        } else if(method == 'POST' || method == "DELETE"){
            requestConfig.body = JSON.stringify(data)
        }
        const response = await fetch(url, requestConfig)
        // const responseJSON = await response.json()
        return response
    } catch (error) {
        throw new Error(error)
    }
}