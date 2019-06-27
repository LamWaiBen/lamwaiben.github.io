## ES6
记录平时比较少用,但是又比较重要的ES6语法.

### Symbol

### Proxy

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

### ArrayBuffer


## ES6.1

### 数组的`includes`方法
    [1,2,3,4].includes(2) // return true  判断数组是否包含指定值, 判断条件类似于'==='

### 指数运算符
    a ** b  等价于 Math.pow(a, b)
