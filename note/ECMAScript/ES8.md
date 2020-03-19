# ES8 (ECMAScript 2017)
记录平时遇到的ES8语法

## 异步 async/await

1. 在遍历中使用async  

    ```javascript
    const arr = [1, 2, 3, 4, 5]
    function pro(i) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(new Date(), i)
                resolve()
            }, i * 1000)
        })
    }

    // 串行执行: for..of 
    async function bar() {
        console.time()
        for (let v of arr) {
            await pro(v)
        }
        console.timeEnd()
    }

    // 并行执行: Promise.all
    async function foo(){
        console.time()
        await Promise.all(arr.map(v => {
            return pro(v)
        }))
        console.timeEnd()
    }
    ```


## Object.values()


## Object.entries()


## string.padStart() 和 string.padEnd()
填充字符串达到指定长度


## 函数参数列表和调用中尾部的逗号
允许在函数参数以逗号结尾
```
function es8(var1, var2, var3,) {
  // ... 
}
```