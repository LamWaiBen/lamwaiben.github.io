// 类装饰器
// 类的构造函数作为唯一的参数传递给装饰器
function replace<T extends {new(...args: any[]): {}}>(target: T) {
    return class extends target {
        newName = 'newName'
        age = 18
    }
}

@replace
class Person {
    oldName = "oldName";    // 等同于 设置类型 string 并 默认值为 'oldName'
    constructor(oldName: string) {
        this.oldName = oldName;
    }
}
console.log(new Person('ben'))  // class_1 { oldName: 'ben', newName: 'newName', age: 18 }



// 方法装饰器
// 方法装饰器接收3个参数: 1. 类的原型对象; 2. 方法名称; 3. 方法的属性描述符
 /***** 
  * 注意:
  * 这里编译的时候如果代码输出目标版本小于ES5时, 执行的时候'descriptor' 将会是undefined.
  * 解决办法: 指定目标版本 
  * 命令: tsc decorator.ts --target ES5
  */
function hack(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunction = target[propertyKey];
    const newFunction = function(...args: any[]) {
        oldFunction.call(target, ...args);
    }
    console.log(descriptor)
    descriptor.value = newFunction; // 替换原函数的值
}

class Demo_fn{
    @hack
    demo() {
        console.log('raw, call demo')
    }
}
const demo_fn = new Demo_fn()
demo_fn.demo()      
//  call function demo
//  raw, call demo




// 属性迭代器
// 接收2个参数:  1. 类的原型对象; 2. 属性名;
function attr(value: string) {
    return function (target: any, propertyKey: string) {
        target[propertyKey] = value
    }
}

class Demo_attr{
    @attr('from decorator') name?: string;
}

const demo_attr = new Demo_attr()
console.log(demo_attr, demo_attr.name)      // Demo_attr {} from decorator