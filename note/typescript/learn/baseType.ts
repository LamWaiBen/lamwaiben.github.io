/**
 * 基础类型
 * boolena, string, number, Array, 元组Tuple, 枚举 enum, Any, 
 * void, null和undefined, never, object
 * 
 */

// 数组类型
// 第一种方式: 类型+方括号
let list: number[] = [1];

// 第二种方式: 数组泛型
let list2: Array<number> = [2];

// 第三种方式: 接口
interface NumberArray {
    [index: number]: number;             // 表示 0, 1, 2, 等数组索引获取的值是number
}

// 第四种方式: 类数组
function _fn1() {
    let args: {
        [index: number] : number,           // 表示 0, 1, 2, 等数组索引
        length: number,
        callee: Function,
    } = arguments
}




// 元组 Tuple    联合类型
let x: [string, number, string | number] = ['key', 2, 3]       
// x[0].substr(1)  // OK
// x[1].substr(1)  // Error, 'number' does not have 'substr'
x[2] = '333'
x[2] = 333




// 枚举
enum Color {Red = 1, Green, Blue = 4}
let Red = Color.Red
let colorName: string = Color[2]




// null undefined
let n: null = null
let test: number = 123

test = n




// void  null与undefined为void的子集
function warn(params:any): void {

    // return null              // ok
    // return undefined         // ok
}




// never 永不存在 不可赋值
function error(): never {
    throw "";
}





// object object的属性默认为any
declare function create(o: object): void;
create({}); // OK
create(null); // OK
// create(42); // Error





/**************  函数  ******************/
// 函数声明方式,  默认值
function sum_fn1(x: number, y: number, z: number = 0): number {
    return x + y + z
}
// 函数表达式方式, 剩余参数
let sum_fn2:(x:number, y:number, ...items: number[]) => number = function(x, y, ...items) {
    let sum = x + y
    for(let v of items){
        sum += v
    }
    return sum
}
// 接口形式
interface SearchFunc {
    (source: string, subString: string, lastString?: string): boolean
}
let mySearch: SearchFunc = function (source, subString) {
    return source.search(subString) !== -1
}

// 重载 会先从最开始的规则匹配
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x == 'number') {
        return Number(x.toString().split('').reverse().join())
    } else if (typeof x == 'string') {
        return x.split('').reverse().join('')
    }
    return ""
}


// 类型断言  把某个值断定是某个类型(必须是联合类型中存在的类型)
let someValue: any = "it's string"
let strLength: number = (<string>someValue).length  // 尖括号语法
let strLength_: number = (someValue as string).length   // as

function getLength(something:string|number): number {
    if ((<string>something).length) {
        return (something as string).length
    }else{
        return something.toString().length
    }
}

export {}