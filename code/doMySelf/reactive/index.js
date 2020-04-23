const { observe } = require('./observe')
const { Watcher, $watch} = require('./Watcher')



///////  test case ///////
let data = {
    a: 1,
    b: [
        [1, 2]
    ]
}

observe(data)

$watch(data, 'a', () => {
    console.log('watch a:::', data.a, data.b)
})
$watch(data, 'b', () => {
    console.log('watch b:::', data.a, data.b)
})


// 在render函数中
new Watcher(data, () => {
    console.log('render')
    data.b
}, () => {
    console.log('watch func:::', data.a, data.b)
})






data.b[0].push(3)
data.a = 123
// data.a = 456
// data.a = 789