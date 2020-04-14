
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


abstract class Aniame {
	public name: string
	private readonly privateName: string
	protected protectedName: string
	public constructor(name: string, privateName: string, protectedName: string) {
		this.name = name
		this.privateName = privateName
		this.protectedName = protectedName
	}

	public abstract sayName(): string // 抽象方法只能出现在抽象类中
}

class Person_Aniame extends Aniame {
    public sayName() {
        return this.name
    }
    // public sayPrivateName(): string {    // 会报错
    //     return this.privateName
    // }
}

let jack = new Person_Aniame("jack", "1", "2")
console.log(jack.sayName())



/**
 * 类实现接口   implements
 *   类之间的共有特性可以提取成接口(imterfaces), 用 implements 关键字来实现, 提高复用性
 * 
 */


interface Alarm {
    alert()
}

interface Light {
    lightOn();
    lightOff();
}

// 接口继承, extends 后的可以是interface 也可以是 class 
interface LightableAlarm extends Alarm {    
    lightOn();
    lightOff();
}

class Door {

}

class SecurityDoor extends Door implements Alarm {
    alert () {
        console.log("SecurityDoor alert")
    }
}

class Car implements Alarm, Light {     // 实现多个接口, 也可以通过接口继承
    alert() {
        console.log('Car alert')
    }

    lightOn(){

    }
    lightOff(){

    }
}


