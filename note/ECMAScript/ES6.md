## ES6
记录平时比较少用,但是又比较重要的ES6语法.

### Symbol

### Proxy   
拦截对象的方法, 并用新的方法来代理被拦截的方法, 常见的方法有:
1. get/set
2. apply    
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


### Reflect
`Reflect`对象与`Proxy`对象一样，也是ES6为了操作对象而提供的新API.目的是:

1. 将一些属于语言内部的方法(如 `Object.defineProperty`), 放到`Reflect`上.
2. 修改某些`Object`方法的返回结果, 使其更合理.比如 Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
3. 把命令式的操作改成函数行为. 

    比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
4. eflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。可以避免`Proxy`方法拦截后, 无法再调用默认行为, 而通过`Reflect[方法名]`, 可以完成原来的默认行为

### Iterator

### Generator函数

### Class

1. super
    - 作为函数使用时, 代表父类的构造函数
    - 作为对象使用时, 代表父类的原型对象

### ArrayBuffer


## ES6.1

### 数组的`includes`方法
    [1,2,3,4].includes(2) // return true  判断数组是否包含指定值, 判断条件类似于'==='

### 指数运算符
    a ** b  等价于 Math.pow(a, b)
