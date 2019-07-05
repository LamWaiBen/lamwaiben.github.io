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
    4. new绑定 - 使用new操作符来创造一个全新对象,并把`this`绑定到这个对象
        ```javascript
        function foo(a){
            this.a = a
        }
        let bar = new foo(2)
        console.log(bra.a) // 2
        ```

        `new`操作符做了以下事情:
        1. 创建一个全新的对象
        2. 这个新对象会被接入构造函数的原型对象, 接入原型链
        3. 这个新对象会被设置为函数调用的`this`绑定
        4. 除非函数返回另外的对象, 否则这个新对象将自动返回

- 一切皆有顺序
    由于 new 和 call/apply不能同时使用, 但是我们仍然可以通过bind来测试:
    ```javascript
    function foo(some){
        this.a = some
    }
    var obj = {}
    var bar = foo.bind(obj)
    bar(2)
    console.log("obj.a:", obj.a)
    var obj2 = new bar(3)
    console.log("obj.a:", obj.a)
    console.log("obj2.a:", obj2.a)
    // 可以知道 new绑定 比 明确绑定 的优先级高
    // 我们可以利用 new 可以覆盖硬绑定(bind)来实现默认"柯里化"

    function curry(p1, p2){
        this.val = p1 + p2
    }
    var p1 = curry.bind(null, "p1")     // 传null是因为后面可以使用new操作符重新更改this
    var p = new p1("p2")
    console.log('p.val:', p.val)        // p1p2
    ```

    总结一下从函数调用的调用点来判定`this`的规则:

        new 绑定 > 明确绑定 > 隐含绑定 > 默认绑定
        new foo() > foo.call(obj) > obj.foo() > foo()

- 绑定的特例

    1. 当把`null`或`undefined`作为call, apply或bind的`this`绑定参数时,这些值会被忽略掉,而采取默认绑定的规则
        ```javascript
        function foo(a,b){
            console.log(`a:${a}, b:${b}`)
            this.a = a
        }
        foo.apply(null, [2, 3])  // a:2, b:3
        // 注意! 这时候会的污染全局对象, 我们正确的做法是:
        let empty = Object.create(null)     // 创造一个完全为空的对象, 与{}的区别在于, 没有Object.prototype
        foo.apply(empty, [2, 3])  // a:2, b:3
        ```
    2. 函数的间接引用, 当一个函数的间接引用被调用时,默认绑定规则也适用
        ```javascript
        function foo(){console.log(this.a)}
        var a = 2
        var o = {a: 3, foo}
        var p = {a: 4}
        o.foo()     // 3
        (p.foo = o.foo)()   // 2,  p.foo = o.foo返回foo函数的间接引用, 这时候this适用默认绑定的规则
        ```

- 词法 this
    上面讨论的四种规则, 在箭头函数内不适用.箭头函数从他的作用域采用`this`绑定, 即采用作用域里面的`this`作为箭头函数内部的`this`, 有种类似于继承的感觉.

## 对象
- 内建对象  
    `function`是对象的一种子类型(可调用的对象), 而下列内建对象看起来像`类(class)`,实际上是`函数`
    * String
    * Number
    * Boolean
    * Object
    * Array
    * Date - 仅有构造对象形式,没有字面形式
    * Regexp
    * Error
    ```javascript
    var nStr = new String('a')
    var str = "a"
    typeof nStr     // "object"
    typeof str      // "string"
    Object.prototype.toString.call(nStr)        // "[object String]"
    Object.prototype.toString.call(str)         // "[object String]"
    nStr instanceof String;         // true
    str instanceof String;          // false

    // 那么为什么有时候我们平时使用string基本类型的时候, 能正常使用String对象类型的方法呢?
    // 是因为引擎在必要的时候会自动把基本类型强制转换成内建对象类型
    ```

- 内容  
    对象的内容其实并不是真正的在对象上, 对象这个容器其实只是保存了这些属性名,以及属性名所对应的指针, 通过指针来引用真正的值储存的地方.

    访问内容,我们通过键(key)来访问, 通常有两种方式:
    ```javascript
    let a = "a"
    var mObject = {
        a: 1,
        [a + "_"]: 2,       // 计算型属性名
    }
    mObject.a              // 1
    mObject[a + "_"]       // 2
    ```

- 数组  
    数组是一个结构化的对象, 采用数字索引作为key, 虽然也可以使用点语法或[]操作符对其定义属性,但是并不会改变数组的length
    ```javascript
    var myArray = [ "foo", 42, "bar" ];
    myArray.baz = "baz";
    myArray.length;	// 3
    myArray.baz;	// "baz"
    console.log(myArray)    //  ["foo", 42, "bar", baz: "baz"]
    ```


- 复制对象  
    由于对象是引用类型的数据结构, 所以我们可以分为两种复制: 浅拷贝和深拷贝.
    1. 函数
        ```javascript
        // 深拷贝
        Function.prototype.clone=function(){
            return eval( '('+this.toString()+')' );
        }
        ```
    2. 数组/对象
        ```javascript
        //浅拷贝
        let newObject_shallow = Object.assign({}, oldObject)

        //深拷贝
        let newObject_deep = JSON.parse(JSON.stringify())   // 简单方案, 无法拷贝原型链
        ```

- 属性描述符(Property Descriptors)  
在es5之后,对象的所有属性都可以使用属性描述符来描述, 属性描述符主要有4个性质
    1. 可写性 - writable
        writable不能与getter/setter共存
    2. 可枚举性 - enumerable    
        为false的时候不会出现在for..in / Object.keys(obj)中
    3. 可配置性 - configurable  
        为false的时候所有描述符都不能改变(除了将writable由true改成false)    
        也无法使用`delete`操作符
    4. 值 - value / getter & setter


- 不可变性(Immutability)    
    有时候我们期望一个对象的属性以及方法不改变,以免引用到它的其他对象方法函数收到影.   
    为了达到这种不可变性, 我们可以有下面的方法:
    1. 对象常量 - 在属性描述符上实现
    2. 防止扩展 - Object.preventExtensions(obj). 不能添加属性
    3. 封印 - Object.seal. 不能删除/配置属性. 实质上也是调用 Object.preventExtensions 并设置属性描述符 configurable:false.
    4. 冻结 - Object.feeze 完全不能改变属性.调用 Object.seal(), 且属性描述符设置为 writable:false

- 存在性(Existence) 
想判断对象是否拥有特定属性值的时候可以使用 `in`操作符 或 `hasOwnroperty`方法
    ```javascript
    var myObject = {
        a:2
    }
    "a" in myObject // true     若当前对象找不到时会根据原型链去寻找属性
    "b" in myObject // false
    myObject.hasOwnProperty( "a" );	// true     仅检查当前对象
    myObject.hasOwnProperty( "b" );	// false
    ```

- 迭代(Iteration)   
    1. 使用`for..in`可以迭代对象上所有可以迭代的属性名(包含原型链).
    2. 使用`for..of`可以迭代数组上所有的值, 如果想要迭代对象, 则需要在对象上内建一个`@@iterator` 属性, 虽然`@@iterator`本身不是迭代器对象, 但是它是一个返回迭代器对象的方法.    
    数组可以在for..of循环中自动迭代是因为数组内建了`@@iterator`, 但是对象是没有内建`@@iterator`的, 所以for..of方法是无法迭代对象的,除非我们自己在对象上实现一个`@@iterator`方法.

    ```javascript
    var myObject = {
        a: 2,
        b: 3
    };

    Object.defineProperty( myObject, Symbol.iterator, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: function() {
            var o = this;
            var idx = 0;    // 存放不同的迭代器id
            var ks = Object.keys( o );
            return {    // 返回一个迭代器
                next: function() {
                    return {
                        value: o[ks[idx++]],
                        done: (idx > ks.length)
                    };
                }
            };
        }
    } );

    // 手动迭代 `myObject`
    var it = myObject[Symbol.iterator]();
    it.next(); // { value:2, done:false }
    it.next(); // { value:3, done:false }
    it.next(); // { value:undefined, done:true }

    // 用 `for..of` 迭代 `myObject`
    // 说明 for..of 是通过 Symbol.iterator 来获取迭代器it, 然后调用 it.next() 来迭代的
    for (var v of myObject) {
        console.log( v );
    }
    // 2
    // 3
    ```

## 混合"类"的对象   
面向对象编程的三个基本特征: 封装, 继承, 多态.
- 多态（在继承链的不同层级上拥有同名的不同函数）也许看起来意味着一个从子类回到父类的相对引用链接，但是它仍然只是拷贝行为的结果。
- JavaScript中没有真正的类, 只通过(原型)对象来模拟类, 

## 原型 
- [[Prototype]] 
当在对象内读取一个属性的时候,如果读不到这个值,那么它就会在它的原型(prototype)上去找这个值, 顺着原型链找直至尽头, 若最后还是找不到则返回undefined.

- 设置与遮蔽属性    
当我们想要在一个对象上设置属性时,假如这个对象的原型链上已经存在同样的key时,对象的行为可能有3种情况:     
myObject.foo = 'bar'   
当foo不直接存在myObject, 但是存在于myObject的原型链上时:
    1. foo在原型链上且`没有被标记为只读(writable:false)`时, foo直接添加到myObject上,形成一个遮蔽属性
    2. foo在原型链上且`被标记为只读(writable:true)`时, foo是无法在myObject上创建遮蔽属性的, 假如在严格模式下,还会抛出错误
    3. foo在圆形脸上且`它是一个setter`, 那么这个setter总是会被调用,导致foo不会被添加到myObject上 

    以上的三种情况,只有第一种能成功创建遮蔽属性, 第二和第三中是无法使用`=`赋值的,必须要使用Object.defineProperty(..)    
    此外遮蔽还会对给我们带来误导,我们提倡尽量不要创建遮蔽属性,如下:
    ```javascript
    var anotherObject = {
        a: 2
    };

    var myObject = Object.create( anotherObject );

    anotherObject.a; // 2
    myObject.a; // 2

    anotherObject.hasOwnProperty( "a" ); // true
    myObject.hasOwnProperty( "a" ); // false

    myObject.a++; // 噢，隐式遮蔽！ 相当于 myObject.a = anotherObject.a + 1

    anotherObject.a; // 2
    myObject.a; // 3

    myObject.hasOwnProperty( "a" ); // true
    ```
- 类    
其实JavaScript中并没有真正类, 只有对象,而且试图用对象来模拟类   
在面向类的语言中,实例的属性时从类`拷贝`而来的,但是js并没有真正的类, 所以在js中是通过原型链把实例与原型对象`连接`起来,令实例可以访问到原型的属性而`模拟拷贝`的效果
    ```javascript
    function Foo() {
        // ...
    }
    var a = new Foo();
    Object.getPrototypeOf( a ) === Foo.prototype; // true
    ```
- 构造器(Constructors)  
    > 实例的constructor属性并非完全真正指向其构造函数, 它仅能代表它的原型对象的constructor值, 而实例的原型对象是可以随时改变的!

    我们来分析一个对象是如何从一个类中构造出来的.   
    ```javascript
    function Foo() {
        console.log('doing something...')

    }

    Foo.prototype.constructor === Foo; // true

    var a = new Foo();      // doing something...
    a.constructor === Foo; // true

    // 上面的代码, 我们可以看到函数Foo在定义的时候, 原型对象会自动创建一个构造器constructor的属性,值为Foo函数自身,当使用new操作符调用Foo时, Foo执行自身的内容并创建了一个新的对象a, a的构造器看起来指向Foo.
    
    ```
    可是事实上真的是这样的吗?  

    1. 任何函数在定义的时候, 该函数的fn.prototype上自动创建一个constructor属性, 该属性的值是该函数自身  
    2. 实例的构造器constructor属性并非自己的属性,而是来自于其原型对象上的constructor属性, 当其原型对象找不到时则一直往原型链上游去寻找.     

    我们来验证一下这些观点:
    ```javascript
    function Foo() { /* .. */ }

    Foo.prototype = { /* .. */ }; // 创建一个新的 prototype 对象, 该原型对象是手动创建的, 所以其constructor属性为空

    var a1 = new Foo();
    a1.constructor === Foo; // false!  由于a1的原型对象已经变成一个自定义的原型对象, 所以其constructor属性自然不等于构造函数Foo
    a1.constructor === Object; // true!  自定义的原型对象会往原型链的上游寻找constructor属性, Object.prototype的.constructor属性是内建的Object函数
    ```
    可以得出结论:
    
        实例的.constructor并非严格指向它的构造器函数, 它是可以人为改变的`(修改prototype或添加属性)`. 构造器不是意味着被XX构建!

- 原型继承  
    js中的继承只能通过原型来模拟, 称为原型继承. "类"与"类"之间的继承也是通过原型对象来模拟的.
    ```javascript
    // 加入我们有两个类Foo和Bar, 我们想要Bar类是继承自Foo类.
    function Foo(name){
        this.name = name
    }
    Foo.prototype.myName = function(){ return this.name }
    function Bar(name, label){
        Foo.call(this, name)
        this.label = label
    }

    // 如何把两个类的原型连在一起呢?
    // 第一种方法: 丢弃Bar原来的原型, 然后创建一个新的对象,并把Foo的原型作为改对象的原型, 然后再给Bar.prototype设置方法
    /**
    Bar.prototype = Object.create(Foo.prototype)
    Bar.prototype.constructor = Bar         //由于原型被替换, 所以需要修复Bar.constructor
    Bar.prototype.myLabel = function(){ return this.label }

    // 扩展: 假如Object.create方法不存在时:
    	Object.create = function(o) {
            function F(){}
            F.prototype = o;
            return new F();
        };
    **/

    // 第二种方法: ES6的语法 Object.setPrototypeOf(), 把Foo.prototype作为Bar.prototype的.prototype属性, 无需创建空对象
    Bar.prototype.myLabel = function(){ return this.label }
    Object.setPrototypeOf(Bar.prototype, Foo.prototype)
    Object.getPrototypeOf(Bar.prototype) === Foo.prototype      // true

    let a = new Bar("a", "obj a")
    a.myName()      // "a"
    a.myLabel()     // "obj a"
    ```

    在修改Bar.prototype的时候,经常会有两种常见的误区/困惑:
    ```javascript
    // 1. 并不会如期望中的那样工作, 而且会影响所有链接到Foo.prototype的对象
    Bar.prototype = Foo.prototype;

    // 2. 如期望中的那样工作, 但是会带来副作用(1. 构造函数内部的this可能会造成环境污染; 2. 执行一遍函数消耗性能)
    Bar.prototype = new Foo()

    ```
- 考察"类"的关系    
    
    当我们想要知道两个对象是否存在原型关系, 我们有3种方法:
    1. a instanceof A - 在a的原型链中, 有没有构造函数A的.prototype的存在
    2. A.prototype.isPrototypeOf(b) - 在b的原型链中, 有没有A.prototype的存在
    3. Object.getPrototypeOf(a) - 获取a的原型对象, 再手动进行比较
    ```javascript
        function A() {
        }
        A.prototype.blah = function(){};

        function B(){
        }
        B.prototype = Object.create(A.prototype)

        var a = new A();
        var aa = Object.create(a)
        var b = new B()


        // A 与 a 与 aa 的关系
        a instanceof A      // true
        a.isPrototypeOf(aa)      // true    
        A.prototype.isPrototypeOf(aa)    // true

        Object.getPrototypeOf(aa) === a      // true
        Object.getPrototypeOf(aa) === Object.getPrototypeOf(a)       // false
        Object.getPrototypeOf(a) === A.prototype

        // A 与 B 的关系
        B.prototype instanceof A    // true
        Object.getPrototypeOf(B.prototype) === A.prototype
        A.prototype.isPrototypeOf(B.prototype)

        // b 与 A 与 B的关系
        b instanceof A          // true
        b instanceof B          // true
        Object.getPrototypeOf(b) === B.prototype    // true
        A.prototype.isPrototypeOf(b)                // true
        B.prototype.isPrototypeOf(b)                // true

    ```

## 行为委托 
JavaScript中的继承其实更像`委托`,  继承的父类并不是拷贝属性而是委托连接.    
深入了解js中的原型,之后其实原型最重要的实质`全部在于被连接到其他对象的对象`, 为了用好原型,我们可以学习一下面向委托的设计.

- 原型-原型链-实例之间的关系图
![YDKJS_prototype](../../pic/YDKJS_prototype.png)

- 原型,class语法糖和OLOO之间的比较  
    1. 基于原型的类设计
        ```javascript
        // 父类
        function Widget(width,height) {
            this.width = width || 50;
            this.height = height || 50;
            this.$elem = null;
        }

        Widget.prototype.render = function($where){
            if (this.$elem) {
                this.$elem.css( {
                    width: this.width + "px",
                    height: this.height + "px"
                } ).appendTo( $where );
            }
        };

        // 子类
        function Button(width,height,label) {
            // "super"构造器调用
            Widget.call( this, width, height );
            this.label = label || "Default";

            this.$elem = $( "<button>" ).text( this.label );
        }

        // 使 `Button` “继承” `Widget`
        Button.prototype = Object.create( Widget.prototype );

        // 覆盖“继承来的” `render(..)`
        Button.prototype.render = function($where) {
            // "super"调用
            Widget.prototype.render.call( this, $where );
            this.$elem.click( this.onClick.bind( this ) );
        };

        Button.prototype.onClick = function(evt) {
            console.log( "Button '" + this.label + "' clicked!" );
        };

        $( document ).ready( function(){
            var $body = $( document.body );
            var btn1 = new Button( 125, 30, "Hello" );
            var btn2 = new Button( 150, 40, "World" );

            btn1.render( $body );
            btn2.render( $body );
        } );
        ```
    2. class语法糖
        ```javascript
        class Widget {
            constructor(width,height) {
                this.width = width || 50;
                this.height = height || 50;
                this.$elem = null;
            }
            render($where){
                if (this.$elem) {
                    this.$elem.css( {
                        width: this.width + "px",
                        height: this.height + "px"
                    } ).appendTo( $where );
                }
            }
        }

        class Button extends Widget {
            constructor(width,height,label) {
                super( width, height );
                this.label = label || "Default";
                this.$elem = $( "<button>" ).text( this.label );
            }
            render($where) {
                super.render( $where );
                this.$elem.click( this.onClick.bind( this ) );
            }
            onClick(evt) {
                console.log( "Button '" + this.label + "' clicked!" );
            }
        }

        $( document ).ready( function(){
            var $body = $( document.body );
            var btn1 = new Button( 125, 30, "Hello" );
            var btn2 = new Button( 150, 40, "World" );

            btn1.render( $body );
            btn2.render( $body );
        } );

        ```

    3. OLOO风格
        ```javascript
        // 字面量创建一个原型
        var Widget = {
            init: function(width,height){
                this.width = width || 50;
                this.height = height || 50;
                this.$elem = null;
            },
            insert: function($where){
                if (this.$elem) {
                    this.$elem.css( {
                        width: this.width + "px",
                        height: this.height + "px"
                    } ).appendTo( $where );
                }
            }
        };

        // Button继承原型
        var Button = Object.create( Widget );

        Button.setup = function(width,height,label){
            // delegated call   委托调用
            this.init( width, height );
            this.label = label || "Default";

            this.$elem = $( "<button>" ).text( this.label );
        };
        Button.build = function($where) {
            // delegated call
            this.insert( $where );
            this.$elem.click( this.onClick.bind( this ) );
        };
        Button.onClick = function(evt) {
            console.log( "Button '" + this.label + "' clicked!" );
        };

        $( document ).ready( function(){
            var $body = $( document.body );

            // 由于Button是一个对象, 所以使用Object.create创建一个链接Button的新对象
            var btn1 = Object.create( Button );
            btn1.setup( 125, 30, "Hello" );

            var btn2 = Object.create( Button );
            btn2.setup( 150, 40, "World" );

            btn1.build( $body );
            btn2.build( $body );
        } );
        ```
    
    OLOO的风格丢掉了`new` 和`.prototype`的使用, 可以不再关心JavaScript中那脆弱的constructor, 创建和初始化没必要合并在同一个操作中, 而且也可以不像类继承那样在子类中屏蔽父类的方法.

- 鸭子类型(duck typing) 
    > "如果它看起来像鸭子，叫起来像鸭子，那么它一定是一只鸭子"  

    比如Promise的thenable判断: 假如一个对象拥有.then()方法, 则把它看成是promise对象, 期望它将按照所有的Promise标准行为一样运作

## 附录A: ES6 Class 
- class解决的痛点
    1. 假装修复 JS 中的类/继承设计模式, 使继承从杂乱的`.prototype`和不稳定可变的`.constructor`中解放出来.
- class的坑
    1. 由于class它并非真正的`类继承`,只是原型继承的语法糖,底层依然是依赖原型的, 所以如果替换了父类上的一些属性/方法的时候,所有子类都会受到影响,而且并不能直观的发现问题, 因为真正的`类继承`是拷贝属性的而不是`依赖`.
    2. super的坑. super并不是动态绑定的,它声明的时候被"静态地"绑定, 在调用的时候`super里面的this是所在类的实例`.