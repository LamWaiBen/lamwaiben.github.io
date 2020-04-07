/**
 * 
重新定义相等:  只要长得一样就认为是相等.

我们认为：
NaN 和 NaN 是相等
[1] 和 [1] 是相等
{value: 1} 和 {value: 1} 是相等

不仅仅是这些长得一样的，还有:
1 和 new Number(1) 是相等
'Curly' 和 new String('Curly') 是相等
true 和 new Boolean(true) 是相等
 */

function equal(a, b, aStack = [], bStack = []) {

    // 1. 先从简单的基本类型开始
    if (a === b) return a !== 0 || 1 / a === 1 / b;   // 考虑特例: +0 和 -0

    // 2. 基本类型中的特例: NaN
    if (a !== a || b !== b) return a !== a && b !== b;

    // 3. 是基本类型又不相等, 返回false
    let type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;

    // 4. 非基本类型中的优化: typeof null 的结果为 object, 尽早跳出对象遍历
    if (a == null || b == null) return false;

    // 判断对象
    return deepEq(a, b, aStack, bStack);
}

function deepEq(a, b, aStack = [], bStack = []) {
    let className = Object.prototype.toString.call(a);
    if (className !== Object.prototype.toString.call(b)) return false;

    // 判断ToPrimitive 是否相等
    switch (className) {
        case "[object String]":
        case "[object RegExp]":
            return "" + a === "" + b
        case "[object Number]":     // Number中的两个特例:  +0/-0 和 NaN
            if (+a !== +a || +b !== +b) return +a !== +a && +b !== +b;
            return +a === 0 ? 1 / +a === 1 / +b : +a === +b;
        case "[object Date]":
        case "[object Boolean]":
            return +a === +b;
    }

    // 剩下 array, function, object 未判断

    // 检查对象的循环引用
    let len = aStack.length;
    while (len--) {
        if (aStack[len] === a) return bStack[len] === b;
    }
    aStack.push(a);
    bStack.push(b);

    if (className === '[object Array]') {
        // Array
        let len = a.length
        while (len--) {
            if (!equal(a[len], b[len], aStack, bStack)) return false
        }
    } else {
        
        // 排除函数的比较 function
        if (typeof a != 'object' || typeof b != 'object') return false

        // object

        var aCtor = a.constructor,
            bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        // 两者的构造函数不一样 且 构造函数不是Object 且 构造函数都存在的情况下 说明两个对象肯定不一样
        // 或者换一种说法 任一构造函数不存在时 或 构造函数一样时 或 构造函数是Object函数时, 出现上诉任一情况则需要进一步判断
        if (aCtor !== bCtor && 
            !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && 
            ('constructor' in a && 'constructor' in b)) {
            return false;
        }


        let keys = Object.keys(a);
        let len = keys.length
        if (Object.keys(b).length != len) return false
        while (len--) {
            let key = keys[len]
            if(!(b.hasOwnProperty(key) && equal(a[key], b[key], aStack, bStack))) return false
        }
    }

    aStack.pop();
    bStack.pop();
    return true
}



// test case
console.log(equal(0, -0))                   // false
console.log(equal(NaN, NaN))                // true
console.log(equal({ a: 1 }, { a: 1 }))          // true
console.log(equal(new Date(), new Date()))  // true
console.log(equal(/a/i, new RegExp(/a/i)))   // true
console.log(equal([1], [1]))                // true

var a, b;

a = { foo: { b: { foo: { c: { foo: null } } } } };
b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

console.log(equal(a, b)) // true