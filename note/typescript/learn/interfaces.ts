


// 可选属性
// interface SquareConfig {
//     color?: string;
//     width?: number;
// }

// function createSquare(config: SquareConfig): { color: string; area: number } {
//     let newSquare = { color: "white", area: 100 };
//     if (config.clor) {
//         // Error: Property 'clor' does not exist on type 'SquareConfig'
//         newSquare.color = config.clor;
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width;
//     }
    
//     return newSquare;
// }

// let mySquare = createSquare({ color: "black" });


// 只读属性

interface Point {
    readonly x: number,
    readonly y: number,
}

let a_read: number[] = [1,2,3,4]
let ro: ReadonlyArray<number> = a_read
a_read = ro as number[]



// 额外的属性检查

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    return newSquare;
}
// let mySquare = createSquare({ colour: "red", width: 100 }); //ERROR 字面量对象会经过额外属性检查

// 有3种方法绕过这些检查
//1.使用断言
let mySquare_1 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
//2. 添加字符串索引签名
interface SquareConfig_2 {
    color?: string
    width?: number
    [propName: string]: any
}
//3. 把字面量对象赋值到变量上
let squareOptions = { colour: "red", width: 100 };
let mySquare_3 = createSquare(squareOptions);


//函数类型  括号内是参数  最后是返回值, 参数位置需要保持一致, 参数命名可以不一致
interface SearchFunc{
    (source: string, subString: string): boolean
}
let mySearch_interfaces: SearchFunc = function (source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

// 把对象内的函数接口写法
interface testKeyFunc {
    test(source: string, subString: string): boolean
}

let a_testKeyFunc = <testKeyFunc>{
    test(s, ss){
        return true
    }
}

//可索引类型
// interface StringArray{
//     [index: number]: string
// }


// interface NumberDictionary {
//     [index: string]: number;    //索引类型返回值 为number
//     length: number;    // 可以，length是number类型
//     name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
// }

// 类类型

interface clockInterface {
    currentTime: Date
    setTime(d: Date)
    search: SearchFunc
}

class Clock implements clockInterface{
    currentTime: Date
    setTime(d: Date){
        this.currentTime = d
    }
    search(s, ss){
        return true
    }

    constructor(h: number, m: number) { }
}


// 类的静态部分与实例部分

interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


// 继承接口

interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

// 混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;