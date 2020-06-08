let getCacheData: <T>(key: string) => T = function (key:string) {
    return (window as any).cache[key]
    
}

const ben = getCacheData<Cat>('ben')
ben.run()

// type num = 1|2|3|4;


// enum Days { Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S" };

// const enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }

// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

declare enum Color { Red, Green, Blue};

let color = [Color.Red, Color.Green, Color.Blue]
console.log(color)



class Animal {
    public constructor(public name: string) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
        console.log(this.name);
    }

    public run(): void{}
}


interface Alarm {
    alert(): void;
}

class PlaneDoor {

}

class Plane extends PlaneDoor implements Alarm {
    alert(){console.log(123)}
}




interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray_: CreateArrayFunc;
createArray_ = function <T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray_(3, 'x'); // ['x', 'x', 'x']



interface somArr {
    [index: number]: Cat;
    [index: string]: Animal;
}

let arr: somArr
arr = {
    1: new Cat('1'), 
    2: new Cat('1')
}

var a = arr[1]
var b = arr["1"]



interface Person{
    name: string,
    age: number
}

const sem: Person = { name: 'sem', age: 26 }
type Sem = typeof sem
type k1 = keyof Sem