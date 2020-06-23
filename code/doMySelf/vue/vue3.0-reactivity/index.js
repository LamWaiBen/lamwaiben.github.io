const { reactive, ref, readonly } = require("./reactive"); 
const { effect } = require('./effect')

const o = reactive({ a: 1 })
const runner = effect(() => {
    console.log('a:', o.a)
})

o.a += 1
o.a += 1
o.a += 1