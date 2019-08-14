
var a = [1, 1, 2,2 ,5,5]

function pro(i) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(console.log(new Date().getSeconds()))
        }, i * 1000)
    })
}

// 会阻塞
async function fot() {
    console.time()
    for (let i = 0; i < 5; i++) {
        await pro(i)
        console.log('i', i)
    }
    console.timeEnd()
}

// 不会阻塞
// async function fot(){
//     console.time()
//     await Promise.all(a.map(async (v, i) => {
//         console.log(v)
//         return await pro(i)
//     }))
//     console.timeEnd()
// }

fot()