# 设计模式
GoF 在《设计模式》一种归纳了 23 种设计模式，而它们又属于三种类型的模式，分别是`创建型模式`、`结构型模式`和`行为型模式`。    

这 23 种设计模式主要是基于以下的对象设计原则:  
- `对接口编程而不是对实现编程`
- `优先使用对象组合而不是继承`

### 大分类
- 创建型（5）  
  [工厂模式](#工厂模式)， [抽象工厂](#抽象工厂)， [单例](#单例模式)， [建造者](#建造者)， [原型](#原型模式)
- 结构型（7）  
  [适配器](#适配器模式)， [装饰器](#装饰器模式)， [代理](#代理模式)， [外观/门面模式](#外观模式)， [桥接](#桥接模式)， [组合](#组合模式)， [享元](#享元模式)
- 行为型（11）  
  策略， 模板， 观察者， 迭代器， 中介者， 状态， 职责链， 命令， [访问者](#访问者)， [备忘录](#备忘录)， [解释器](#解释器模式)

创建型设计模式主要解决`“对象的创建”`问题.  
结构型设计模式主要解决`“类或对象的组合或组装”`问题.  
行为型设计模式主要解决的就是`“类或对象之间的交互”`问题.  

设计模式之间的关系:
![the-relationship-between-design-patterns](../../pic/the-relationship-between-design-patterns.jpg)

## 常用的设计模式详解

### 工厂模式
工厂模式是创建对象的一种方法, 工厂内部决定实例化哪一个工厂类, 并可以在实例化时执行一些操作
```javascript
function factoryPerson(name, age) {
    let obj = new Object()
    obj.name = name
    obj.age = age
    return obj
}
let person1 = factoryPerson('tony', 3)
let person2 = factoryPerson('jerry', 6)
```
### 抽象工厂
在工厂模式的基础上再封装一层, 用于管理分配多个工厂
```javascript
function AbstractFactory(type, arg){
    if(type === 'wheel') {
        return new Wheel(arg)
    } else if(type === 'window') {
        return new Window(arg)
    }
}

let wheel = AbstractFactory('wheel')
let window = AbstractFactory('window')

```
### 单例模式
保证类的实例有且仅有一个, 并提供唯一可以访问该实例的方法
```javascript
function singleton(fn){
    let result = null
    return (...args) => result || result = fn.apply(this, args)
}

const getScript = singleton(() => {
    return document.createElement('script')
})

getScript() === getScript()     // true
```
### 建造者
用来参数需要在构造函数中初始化，但是参数又过多的场景, 多个简单的对象一步一步构建成一个复杂的对象.  

未使用建造者模式之前:
```javascript
class Shape {
  constructor(width, height, color, opacity, borderWidth, boxShadow) {
    if (typeof width !== 'number') {
      throw new Error('width should be a number');
    }
    this.width = width;

    if (typeof height !== 'number') {
      throw new Error('width should be a number');
    }
    this.height = height;

    this.color = color;
    this.opacity = opacity;

    if (width < borderWidth) {
      throw new Error('width should be greater than borderWidth');
    }
    this.borderWidth = borderWidth;
  }
}

const shape = new Shape(10, 10, 'red', 1, 10);
```
使用建造者模式改造后:
```javascript
class ShapeConfig {
  constructor(builder) {
    this.width = builder.width;
    this.height = builder.height;
    this.color = builder.color;
    this.opacity = builder.opacity;
    this.borderWidth = builder.borderWidth;
  }
}

class Shape {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.color = '';
    this.opacity = 1;
    this.borderWidth = 0;
  }

  // 可以把多个值的比较逻辑都放在各个设置属性的函数中
  build() {
    if (this.width < this.borderWidth) {
      throw new Error('width should be greater than borderWidth');
    }
    return new ShapeConfig(this);
  }
  setWidth(width) {
    if (typeof width !== 'number') {
      throw new Error('width should be a number');
    }
    this.width = width;
    return this;
  }
  setHeight(height) {
    if (typeof height !== 'number') {
      throw new Error('height should be a number');
    }
    this.height = height;
    return this;
  }
  setColor(color) {
    this.color = color;
    return this;
  }
  setOpacity(opacity) {
    this.opacity = opacity;
    return this;
  }
  setBorderWidth(borderWidth) {
    this.borderWidth = borderWidth;
    return this;
  }
}

const shape = new Shape();
shape
  .setWidth(10)
  .setHeight(10)
  .setColor('red')
  .setOpacity(1)
  .setBorderWidth(11)
  .build();
console.log(shape);
```
### 原型模式
由于JavaScript本身就是基于原型的语言, 可以通过`Object.create`克隆对象.

### 适配器模式
将一个不可用的接口转换成可用的接口, 比如`mpvue, taro 和 electron`, 他们都是在不同的环境/平台之间建立了一层适配器, 使接口可以通用.  
以支付为例子, 磨平各个平台的支付接口差异:  
```javascript
function pay(id, price) {
    const platform = window.platform
    switch(platform) {
        case 'wechat':
            wx.pay({ id, price })
            break;
        case 'alipay':
            alipay.pay({ id, price })
            break;
        case 'jd':
            jd.pay({ id, price })
            break;
        case 'xxx':
            xxx.toPay({ goodsId: id, price })
            break;
    }
}
pay(12345, 100)
```
### 装饰器模式
写代码的时候，我们总遵循“组合优于继承”，而装饰者模式就是一种用组合关系的来组织代码。而我们平时所说的装饰器就是装饰者的一种应用。
```javascript
class Circle{
    draw() {
        console.log('画一个圆')
    }
}

class Decorator {
    constructor(circle){
        this.circle = circle
    }
    draw() {
        this.circle.draw()
        this.setRedBorder(this.circle)
    }
    setRedBorder(circle = this.circle){
        console.log('设置红色边框')
    }
}
let circle = new Circle()
circle.draw()

let dec = new Decorator(circle)
dec.setRedBorder()

```
### 代理模式
它在不改变原始类代码的情况下，通过引入代理类来给原始类附加功能. 常见的例子有nginx代理, 图片预加载.  

图片预加载的例子:
```javascript
const createImage = (function() {
    const img = document.createElement('img')
    document.body.append(img)
    return function(src) {
        img.src = src
    }
})()

const proxyImage = (function(fn) {
    const defaultSrc = 'www.xxx.com/img/abcdefg.jpg'
    const img = new Image()
    return function(src) {
        fn(defaultSrc)
        // 为了更好观察到图片替换过程.
        setTimeout(function() {
            img.src = src
            img.onload = function() {
                fn(src)
            }
        }, 2000) 
    }
})()

const proxy = proxyImage(createImage)
proxy('https://xxxxx.com/finnal_image.jpg')

```
### 外观模式
外观模式为子系统提供一组统一的接口，定义一组高层接口让子系统更易用。它和适配器模式类似，配器是做接口转换，解决的是原接口和目标接口不匹配的问题，而外观模式做接口整合，解决多接口带来的调用问题。  
获取用户接口整合
```javascript
getUserBaseInfo() {
  return API.getUserBaseInfo();
}

getUserPriority() {
  return API.getUserPriority();
}

getUserCustomContent() {
  return API.getUserCustomContent();
}

// 对外提供一个总的接口
async getUserInfo() {
  const baseInfo = await getUserBaseInfo();
  const priority = await getUserPriority();
  const customContent = await getUserCustomContent();
  return { ...baseInfo, ...priority, ...customContent };
}

const userInfo = getUserInfo();

```

### 桥接模式
抽象和实现解耦，让它们可以独立变化。一个方法一般会调用多个其他方法，这种将实现抽象出去，就是桥接模式.

### 组合模式
它规定了数据类型必须是树型结构，并且表示“部分-整体”的层次结构，是用来处理单个对象和组合对象之间的关系。

### 享元模式
应用于大量相似对象的系统。一般是借用工厂模式，新建一个对象，然后其他对象共享这个工厂对象，避免新建对象。享元模式是一种用时间换空间的优化模式，避免性能损耗。  

享元模式的代码比较好理解，某商家有 50 种男款内衣和 50 种款女款内衣，要展示它们. 这种情况可以创建一个模特作为共享对象。  

原代码: 轮流创建50个模特
```javascript
const Model = function(gender, underwear) {
  this.gender = gender
  this.underwear = underwear
}

Model.prototype.takephoto = function() {
  console.log(`${this.gender}穿着${this.underwear}`)
}

for (let i = 1; i < 51; i++) {
  const maleModel = new Model('male', `第${i}款衣服`)
  maleModel.takephoto()
}

```

采用享元模式调整后: 只创建1个模特
```javascript
const Model = function(gender) {
    this.gender = gender
}

Model.prototype.takephoto = function() {
    console.log(`${this.gender}穿着${this.underwear}`)
}

const maleModel = new Model('male')

for (let i = 1; i < 51; i++) {
    maleModel.underwear = `第${i}款衣服`
    maleModel.takephoto()
}

```

### 策略模式

### 模板方法模式

### 观察者模式
与订阅发布模式相似, 但不完全相同.

### 中介者模式

### 职责链模式

### 命令模式

### 访问者
在访问者模式（Visitor Pattern）中，我们使用了一个访问者类，它改变了元素类的执行算法。通过这种方式，元素的执行算法可以随着访问者改变而改变。其次，必须定义一个访问者类，并且内部有visit方法。元素的执行算法实现accept方法，而内部通常都是visitor.visit(this);
```javascript
function Visitor() {
  this.visit = function (v) {
    console.log('the computer type is ' + v.type);
  }
}

function ComputerTypeVisitor(type) {
  this.type = type;
  this.accept = function (visitor) {
    visitor.visit(this);
  }
}

const visitor = new ComputerTypeVisitor('dell');
visitor.accept(new Visitor()); // the computer type is dell
```

### 备忘录
使用场景： 1、需要保存/恢复数据的相关状态场景。 2、提供一个可回滚的操作。  
定义：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样就可以将该对象恢复到原先保存的状态
```javascript
const Page = function () {
  let page = 1,
    cache = {},
    data;
  return function (page) {
    if (cache[page]) {
      data = cache[page];
      render(data);
    } else {
      Ajax.send('cgi.xx.com/xxx', function (data) {
        cache[page] = data;
        render(data);
      });
    }
  }
}();
```

### 解释器模式
这种模式被用在 SQL 解析、符号处理引擎等。  
它是一种特殊的设计模式，它建立一个解释器，对于特定的计算机程序设计语言，用来解释预先定义的文法。通俗点，你通过函数名的定义就能知道程序即将要执行的过程。  
```javascript
function Context() {
  let sum;
  let list = [];
  this.getSum = function () {
    return sum;
  }
  this.setSum = function (_sum) {
    sum = _sum;
  }
  this.add = function (eps) {
    list.push(eps);
  }
  this.getList = function () {
    return list;
  }
}

function PlusExpression() {
  this.interpret = function (context) {
    let sum = context.getSum();
    sum++;
    context.setSum(sum);
  }
}

function MinusExpression() {
  this.interpret = function (context) {
    let sum = context.getSum();
    sum--;
    context.setSum(sum);
  }
}

const context = new Context();
context.setSum(20);
//运行加法三次
context.add(new PlusExpression());
context.add(new PlusExpression());
context.add(new PlusExpression());
//运行减法两次
context.add(new MinusExpression());
context.add(new MinusExpression());
const list = context.getList();
for (let i = 0; i < list.length; i++) {
  const expression = list[i];
  expression.interpret(context);
}
console.log("打印输出结果：" + context.getSum()); // 打印输出结果：21
```

## 参考
[菜鸟教程|设计模式](https://www.runoob.com/design-pattern/design-pattern-tutorial.html)
[设计模式之美-前端](https://zhuanlan.zhihu.com/p/111553641)