/**
 * 内置对象
 */




// ECMAScript 常见的内置对象
let b: Boolean = new Boolean(1)
let e: Error = new Error('Error occured')
let d: Date = new Date()
let r: RegExp = /asd/
let m: Map<number, number> = new Map([[1,2]])
let u: Uint16Array = new Uint16Array(10)



// DOM 和 BOM 的内置对象

let body: HTMLElement = document.body
let addDiv: NodeList = document.querySelectorAll('div')
document.addEventListener('click', function(e: MouseEvent) {
    // do something
})


// 内置方法
Math.pow(2, 2)