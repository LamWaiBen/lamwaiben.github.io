/**
 * generics
 * 泛型: 指在定义函数、接口或类的时候， 不预先指定具体的类型， 而在使用的时候再指定类型的一种特性
 */


/**
 * 函数名后的 <T> 代表泛型, 用T指代任意输入的类型, 后续的未确定的类型可以用T代替
 */
function createArray<T>(length: number, value: T): Array<T> {
    return Array(length).fill(value)
}



/**
 * 多个类型参数
 */
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}



/**
 * 泛型约束  有时候需要对泛型的属性类型限制, 可以让它继承一些接口
 */

interface LengthWise {
    length: number
}

function loggingIdentity<T extends LengthWise>(arg: T): T {
    console.log(arg.length)
    return arg
}

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
let obj_x = {a: 1, b: 2, c: 3}
getProperty(obj_x, "a")




/**
 * 泛型接口: 使用泛型接口定义函数形状
 */

interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>
}


let createArrayFunc: CreateArrayFunc<any>
createArrayFunc = function<T>(length: number, value: T): Array<T> {
	let result: T[] = []
	for (let i = 0; i < length; i++) {
		result[i] = value
	}
	return result
}

createArrayFunc(2, 3)



/**
 * 泛型类: 泛型也可以用在类定义上
 */

class GenericNumber<T> {
	zeroValue: T
	add: (x: T, y: T) => T
}

let stringNumeric = new GenericNumber<number>()
stringNumeric.zeroValue = 1
stringNumeric.add = function(x, y) {
	return x + y
}

console.log(stringNumeric.add(stringNumeric.zeroValue, 10))
