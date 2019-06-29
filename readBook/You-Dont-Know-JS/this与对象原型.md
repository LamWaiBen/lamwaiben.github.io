# this与对象原型


## 啥是this?
- 为什么需要this?

    `this`机制提供了一个优雅的方式来`传递`一个对象引用到函数内部中.而不是把执行环境作为参数传给函数,这样显得臃肿不灵活
    ```javascript
    function identify_A() {
        return this.name.toUpperCase();
    }
    function identify_B(context) {      // 永远都要把执行环境作为参数
        return context.name.toUpperCase();
    }

    let person = {
	    name: "Kyle"
    };

    let identifyFn = identify_A.bind(person)        // 返回一个this绑定为person的函数
    identifyFn()        // KYLE
    identify_B(person)  // KYLE
    ```
- this是如何运作的?
    首先先思考`this`不是如何工作的. 可以假设`this`的指向:
    1. 函数对象自己
        
        初学者通常认为,将函数作为一个对象,在调用函数的时候, `this`就是函数自己. 为了验证这个推测,我们有例子 
        ```javascript
            function foo(num){
                console.log('foo:', num)
                this.count++
            }
            foo.count = 0
            for(let i = 0; i < 5; i++){
                foo(i)
            }
            console.log('foo.count: ',foo.count)

            // 猜猜输出是啥?
            // foo: 0
            // foo: 1
            // foo: 2
            // foo: 3
            // foo: 4
            // foo.count:  0        // 证明this.count引用的根本不是foo.count, 也就是说this并非是指向函数自己
            console.log(window.count)   // NaN, 证明,this其实指向的是window 

            //加入我们想要引用函数自身可以有以下做法:
            // this.count++   =>  foo.count++  
            // this.count++   =>  arguments.callee.count++   不推荐
            // foo(i)         =>  foo.call(foo, i)
        ```

    2. 函数自己所在的作用域

        对`this`另外一个容易产生的误解,是它指向了调用它的函数的作用域.这是极具误导性的.
        参考下面的代码, `this`试图指向调用函数的词法作用域.
        ```javascript
            function foo(){
                var a = 2
                this.bar()
            }
            function bar(){
                console.log('bar,', this.a)
            }
            foo()   // bar, undefined
        ```
        这段代码里非常具有误导性: 
        
        1. foo函数内的`this`是指向window, 而bar恰好定义在window, 所以可以通过this.bar来引用bar函数
        2. 试图通过this.bar()的调用方式, 用`this`在foo()和bar()的词法作用域间建立一座桥梁,是bar函数可以访问foo函数的内部作用域变量`a`, 这样的桥是不可能的, 引擎是不可能利用`this`引用在词法作用域中查找东西.
        
- 什么是this?
    `this`不是编写时绑定,而是运行时绑定.它依赖于函数调用的上下文条件. `this`绑定与函数声明的位置没有任何关系, 而与函数被调用的方式紧密相连.

    当一盒函数被调用时, 会建立成为执行环境的活动记录,这个记录包含函数是从何处被调用的, 如何被调用,被传递什么参数等信息.

    要区分执行环境与词法作用域的区别.

## this豁然开朗
- 调用点(Call-site)

    想要知道函数执行期间`this`到底是指向哪里, 首先要找到调用点, 调用点主要由4种规则判断.

    1. 默认绑定 - 不指定调用对象, 在非`strict mode`下this默认为全局对象
        ```javascript
        function foo() {
            console.log( this.a );
        }
        var a = 2;
        (function(){
            "use strict";       //仅是匿名函数的词法作用域是严格模式, foo函数的词法作用域并不受影响
            foo(); // 2
        })();
        ```
    2. 隐含绑定 - 调用函数的对象会隐式地绑定`this`
        ```javascript
        function foo() {
            console.log(this.a);
        }
        var obj = {
            a: 2,
            foo: foo
        };
        var a = "oops, global"; // `a` 也是一个全局对象的属性
        obj.foo();      // 2



        /***********  隐含丢失的几种情况 **********/

        var bar = obj.foo; // 函数引用！
        bar();  // oops, global

        function doFoo(fn) {
            // `fn` 只不过 `foo` 的另一个引用
            fn(); // <-- 调用点!
        }
        doFoo(obj.foo); // "oops, global"

        setTimeout( obj.foo, 100 ); // "oops, global"

        ```

    3. 明确绑定 - 利用内置API将某个对象作为`this`绑定
        ```javascript
        //内置函数
        function foo() {
            console.log( this.a );
        }
        var obj = {
            a: 2
        };
        foo.call( obj ); // 2

        //API内置的绑定上下文
        function foo(el) {
            console.log( el, this.id );
        }
        var obj = {
            id: "awesome"
        };
        // 使用 `obj` 作为 `this` 来调用 `foo(..)`
        [1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome
        ```
    4. new绑定
    