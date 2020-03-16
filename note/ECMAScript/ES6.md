# ES6
记录平时比较少用,但是又比较重要的ES6语法.

## 变量解构赋值  
下面两种解构赋值并不一样
```javascript
// 第一种
function move({x = 0, y = 0} = {}) {
    return [x, y]
}
move({x: 3, y: 8})  // [3, 8]
move({x: 3}) // [3, 0]
move({}) // [0, 0]
move() // [0, 0]
//{x = 0, y = 0} = {}  的意思有两重: 1. 函数默认参数为 {}; 2.参数解构成x, y 默认值分别为0


// 第二种
function move({x, y} = {x: 0, y: 0}) {
    return [x, y]
}
move({x: 3, y: 8})  // [3, 8]
move({x: 3}) // [3, undefined]
move({}) // [undefined, undefined]
move() // [0, 0]
// {x, y} = {x: 0, y: 0} 的意思有两重: 1.函数默认参数为 {x:0, y: 0}; 2.参数解构成x, y 没有设定默认值

// 上述参数解构默认值的意思是: 当当前值为undefined时, 就采用默认值, 如下:
[1, undefined, 3].map((v = 'yes') => v) // [1, 'yes', 3]

// 第三种
const m = {value: 10}
function foo(n = { ...m }) {
    n.value *= 2
    console.log(n.value)
}
foo()           // 20
foo({value: 1}) // 2
foo()           // 20
foo(m)          // 20
console.log(m)  // 20
foo()           // 40
```

## import/export
    ```javascript
    // a.js
    import b, * as bModule from './b.js'
    console.log(b, bModule)             // {b: 1}, {c: [Function], d: "d", default: {b: 1}}
    console.log(b === bModule.default)  // true

    // import { b } from './b.js'       // 报错, 因为b是在default对象上的, 而{}语法是相对于 * 的
                                        // 又因为 * 中不存在 b 属性, 所以会报错

    // b.js
    const b = {b: 1}
    export default b
    export function c(){}

    // 错误写法
    // let d = "d"
    // export d
    // export "d"

    // 正确写法(3种)
    export var d = "d"

    var d = "d"
    export {d}

    export {
        d as d
    }
    ```

## Symbol

## Proxy   
拦截对象的方法, 并用新的方法来代理被拦截的方法, Proxy支持的拦截操作共有13种:
1. get(target, propKey, receiver)   => receiver参数是返回的Proxy实例自己
2. set(target, propKey, value, receiver)
3. has(target, propKey)             =>  拦截 propKey `in` target
4. deleteProperty(target, propKey)  =>  拦截 `delete` target\[propkey\]
5. ownKeys(target)                  =>  拦截 `Object.keys`(target), `for...in`
6. getOwnPropertyDescriptor(target, propKey)
7. defineProperty(target, propKey, propDesc)
8. preventExtensions(target)        =>  阻止对象添加属性
9. isExtensible(target)             =>  判断对象是否为不可扩展的
10. getPrototypeOf(target)
11. setProptotypeOf(target, proto)
12. apply(target, thisArg, args)     =>  拦截 proxy(...args), proxy.call(thisArg, ...args), proxy.apply(...)
    ```javascript
    function Foo(a, b){
        this.a = a
        this.b = b
    }

    // 代理apply方法, 可以不使用new操作符也能创建对象
    var proxy = new Proxy(Foo, {
        apply(target, ctx, args){
            console.log('proxy param:', target, ctx, args)
            // ctx为空的时候需要用new操作符, 以免this采用默认绑定规则, 污染全局对象
            if(ctx === null || ctx === undefined) return new (target.bind(ctx, ...args))()
            //若ctx存在, 则把他作为this
            return target.bind(ctx, ...args)()
        }
    })

    new proxy(1,2) // {a:1, b:2}
    proxy(3,4)     // {a:3, b:4}

    let ctx = {c: 3}
    proxy.call(ctx, 1, 2)
    ```
13. construct(target, args)        => 拦截 `new` Proxy(...args)


## Reflect
`Reflect`对象与`Proxy`对象一样，也是ES6为了操作对象而提供的新API.目的是:

1. 将一些属于语言内部的方法(如 `Object.defineProperty`), 放到`Reflect`上.
2. 修改某些`Object`方法的返回结果, 使其更合理.比如 Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
3. 把命令式的操作改成函数行为. 

    比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
4. eflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。可以避免`Proxy`方法拦截后, 无法再调用默认行为, 而通过`Reflect[方法名]`, 可以完成原来的默认行为  


Reflect共有13个静态方法:  
1. Reflect.apply(target, thisArg, args)
2. Reflect.construct(target, args)
3. Reflect.get(target, name, receiver)
4. Reflect.set(target, name, value, receiver)
5. Reflect.defineProperty(target, name, desc)
6. Reflect.deleteProperty(target, name)
7. Reflect.has(target, name)
8. Reflect.ownKeys(target)
9. Reflect.isExtensible(target)
10. Reflect.preventExtensions(target)
11. Reflect.getProptotypeOf(target)
12. Reflect.setProptotypeOf(target, proto)
13. Reflect.getOwnPropertyDescriptor(target, name)


## Iterator

## Generator函数

1. next(), throw(), return()
2. yield* 表达式及返回值
3. iterator
4. Generator函数里的this

## Class

1. super
    - 作为函数使用时, 代表父类的构造函数
    - 作为对象使用时, 代表父类的原型对象

## ArrayBuffer

## 箭头函数  
箭头函数没有自己的`this`, 它的`this`只能是箭头函数定义时所在的对象,   
所以无法直接修改箭头函数的this, 只能间接修改`它所在的执行对象`.  
```javascript
    const cat = {
        lives: 9,
        jumps () { 
            // jumps函数的this 隐含绑定为 cat
            return () => --this.lives;  // 箭头函数的this固定为jumps作用域内的this
        }

        eat: () => {
            // 这里的 this 为 全局对象
        }
    }

    cat.jumps()()   // 8
    cat.jumps.call({lives: 100})()  // 99      // 只能通过修改jump的调用对象,

```

1. 容易用错的场景
    - 定义对象的方法  
        ```javascript
            const cat = {
                lives: 9,
                jumps: () => {
                    this.lives--;
                }
            }

            // 由于对象不构成单独的作用域, 所以 jumps箭头函数定义时的作用域是全局作用域

        ```
# ES6.1

## 数组的`includes`方法
    [1,2,3,4].includes(2) // return true  判断数组是否包含指定值, 判断条件类似于'==='

## 指数运算符
    a ** b  等价于 Math.pow(a, b)
