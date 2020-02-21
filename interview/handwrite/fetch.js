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
        } = options

        let requestConfig = {
            credentials: 'include',
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
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
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        throw new Error(error)
    }
}