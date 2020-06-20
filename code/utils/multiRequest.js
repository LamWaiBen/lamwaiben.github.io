/**
 * 批量请求函数
 * 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * 所有请求完成后，结果按照 urls 里面的顺序依次打出
 * @param {*} urls 
 * @param {*} maxNum 
 */
function multiRequest(urls, maxNum) {
    return new Promise((resolve, reject) => {
        const result = Array(urls.length);
        let resNum = 0;
        let promiseIndex = 0;

        while (promiseIndex < maxNum) {
            genNextFetch();
        }

        function genNextFetch() {
            if (promiseIndex >= urls.length) return;
            const curIndex = promiseIndex++;
            fetch(urls[curIndex])
                .then((res) => {
                    result[curIndex] = res;
                    resNum += 1;
                    if (resNum === urls.length) {
                        resolve(result);
                    } else {
                        genNextFetch();
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
}


// test case
function fetch(url) {
    return new Promise((resolve) => {
        let start = new Date();
        setTimeout(() => {
            resolve(`start: ${start};end: ${new Date()}`);
        }, 5000 * Math.random());
    });
}
var a = multiRequest([1, 2, 3, 4, 5, 6, 7, 8, 9], 2);