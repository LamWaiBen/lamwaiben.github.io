

// 解构
let obj = { aa: "A", bb: 123, cc: "C" }
// let {a, b} = obj
// let {aa: name1, cc: name2} = obj       // 这里的冒号不是指示类型的
// 等价于
// let name1 = obj.a
// let name2 = obj.c
// 若要指示类型
let { aa, bb }: { aa: string, bb: number } = obj


// 函数声明
type C = {a:string, b:number}
function f({ a, b }: C): number{
    return b
}