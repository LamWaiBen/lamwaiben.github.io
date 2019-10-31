
/**
 * 类型别名: 自定义类型名称
 */

type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): string {
    if(typeof n === 'string') {
        return n
    }
    return n()
}


/**
 * 字符串字面量类型
 */
type EventName = 'click'|'scroll'|'mousemove'
function handleEvent(ele: Element, event: EventName) {
    // do something
}
handleEvent(document.getElementById('root'), 'scroll')
// handleEvent(document.getElementById('root'), 'dbclick')     // Error




/**
 * 元组:  元组是合并了不同类型元素的数组, 而且不能越界
 */

 let tom: [string, number] = ['Tom', 25]

 tom = ['Jerry', 10]




 /**
  * 枚举: 取值被限定在一定范围内的对象
  *       枚举成员会被赋值为从 0 开始递增的数字, 如果有手动赋值的成员,则按照上一个成员的枚举项开始递增
  */

// 普通枚举
enum Days { Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat }
// Tue 按照上一个 Mon = 1,  开始递增, 即Tue = 2


// 常数枚举
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
// var directions = [0, 1, 2, 3]    只保留数值






/**
 * 类
 *      public      共有属性/方法
 *      private     私有属性/方法
 *      protected   私有属性/方法, 但是可以在子类中访问
 *      readonly    只读属性
 *      abstract  抽象类:  不允许实例化, 必须被子类实现
 * 
 * 
 */


class Aniame {
    name = 'Jack';      // 实例属性
    static num = 42;    // 静态属性
    constructor() {

    }
}