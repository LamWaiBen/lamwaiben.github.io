function ajax({
    url,
    method = 'GET',
    data = {},
    headers,
}) {
    if (fetch) {
        if (method === 'GET' && data) {
            let queryList = Object.keys(data).map(key => `${key}=${data[key]}`)
            if (query.length > 0) {
                url += "?" + queryList.join('&')
            }
        }

        const init = {
            body: JSON.stringify(data),
            method,
            mode: 'cors',
        }
        if (headers) {
            init.headers = headers
        }

        return fetch(url, init)
            .then(resp => {
                const contentType = resp.headers.get('Content-Type')
                if (/application\/json/.test(contentType)) {
                    return resp.json()
                } else if (/text\/html/.test(contentType)) {
                    return resp.text()
                }
                return resp
            })
    } else {
        return new Promise((resolve, reject) => {
            let client = new XMLHttpRequest()

            client.onreadystatechange = function () {
                if (client.readyState !== 4) return
                if (client.status >= 200 && client < 300) {
                    let contentType = client.getResponseHeader('Content-Type')
                    let res = client.response
                    if (/applictaion\/json/.test(contentType)) {
                        res = JSON.parse(res)
                    }

                    resolve(res)
                } else {
                    reject(client.responseText)
                }
            }

            if (method === 'GET' && data) {
                let queryList = Object.keys(data).map(key => `${key}=${data[key]}`)
                if (query.length > 0) {
                    url += "?" + queryList.join('&')
                }
            }

            client.open(url, method, false)
            if (headers) {
                for (let key in headers) {
                    client.setRequestHeader(key, headers[key])
                }
            }
            method === 'GET' ? client.send() : client.send(data)

        })
    }
}