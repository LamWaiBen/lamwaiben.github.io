# ES6与未来

## ES?现在与未来
- 版本    
    ES3: IE6-8      
    ES5: 2009年定稿, Firefox, Chrome, Opera, Safari出现     
    ES5.1:  2011年      
    ES6: 2015年定稿,又称为ES2015  
    ES7: 2016年     

- 转译      
    为了在低版本的浏览器中使用新特性, 可以把代码转译实现.       
    1. 通过babel工具把新特性的代码转译成低版本的等价物
    2. 通过引入模块, 在原型对象上增加同名的方法实现





## 语法
- 解构赋值      
    ```javascript
        var { a: { x: X, x: Y }, a } = { a: { x: 1 } }
        X   // 1
        Y   // 1
        a   // {x: 1}
    ```
- 模板字面量
    ```javascript
        // 标签型模板字面量
        function foo(strings, ...values){
            console.log(strings)
            console.log(values)
        }
        let desc = 'awesome'
        foo`Everything is ${awesome}`
        // [ "Everything is ", "!"]
        // [ "awesome" ]
    ```



## 组织




## 异步流程控制




## 集合



## 新增API



## 元编程
元编程是针对程序本身的行为进行操作的编程。        
元编程关注以下的一点或几点：代码检视自己，代码修改自己，或者代码修改默认的语言行为而使其他代码受影响。      

- 函数名        
    ```
    var abc = function() {
        // ..
    };

    abc.name;				// "abc"
    ```

- 元属性(new.target)        
    ```
    class Parent {
        constructor() {
            // 可以读取到new的类是哪一个.
            if (new.target === Parent) {
                console.log( "Parent instantiated" );
            }
            else {
                console.log( "A child instantiated" );
            }
        }
    }

    class Child extends Parent {}

    var a = new Parent();
    // Parent instantiated

    var b = new Child();
    // A child instantiated
    ```

- 元行为(通用Symbol)        

    1. @@iterator      
        Symbol.iterator属性返回的迭代器会被用于`...` 扩散 和 `for..of` 循环 
    2. @@toStringTag 和 @@hasInstance              
        用于 `toString` 和 `instanceof` 上返回类型值
        ```javascript
        function Foo(greeting) {
            this.greeting = greeting;
        }

        // 默认元行为
        var a = new Foo();
        a.toString();				// [object Object]
        a instanceof Foo;			// true

        // 修改元行为, toString
        Foo.prototype[Symbol.toStringTag] = "Foo";

        // 修改元行为 instanceof
        Object.defineProperty( Foo, Symbol.hasInstance, {
            value: function(inst) {
                return inst.greeting == "hello";
            }
        } );

        var a = new Foo( "hello" ),
            b = new Foo( "world" );

        b[Symbol.toStringTag] = "cool";

        a.toString();				// [object Foo]
        String( b );				// [object cool]

        a instanceof Foo;			// true
        b instanceof Foo;			// false

        ```
    3. @@toPrimitive       
        ToPrimitive抽象强制转换操作, 转换为基本类型时的元行为
        ```javascript
        var arr = [1, 2, 3, 4, 5]
        arr + 10;       // 1,2,3,4,510

        // hint  期望准换成的类型
        arr[Symbol.toPrimitive] = function(hint) {
            if (hint == "default" || hint == "number") {
                // 所有数字的和
                return this.reduce( function(acc,curr){
                    return acc + curr;
                }, 0 );
            }
        };

        arr + 10;				// 25,      hint: default
        arr++                   // 15,      hint: number
        ```

- 代理 proxy        
    返回一个特殊的对象, 它抱着另一个普通的对象, 并且它会拦截原对象的方法

- Reflect API       
    Object原型上的原始方法
