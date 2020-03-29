# 设计模式
GoF 在《设计模式》一种归纳了 23 种设计模式，而它们又属于三种类型的模式，分别是`创建型模式`、`结构型模式`和`行为型模式`。    

这 23 种设计模式主要是基于以下的对象设计原则:  
- `对接口编程而不是对实现编程`
- `优先使用对象组合而不是继承`

### 大分类
- 创建型（5）  
  [工厂模式](#工厂模式)， [抽象工厂](#抽象工厂)， [`单例`](#单例模式)， [建造者](#建造者)， [原型](#原型模式)
- 结构型（7）  
  [`适配器`](#适配器模式)， [`装饰器`](#装饰器模式)， [`代理`](#代理模式)， [外观/门面模式](#外观模式)， [桥接](#桥接模式)， [组合](#组合模式)， [享元](#享元模式)
- 行为型（11）  
  [`策略`](#策略模式)， [模板](#模板方法模式)， [`观察者`](#观察者模式)， [迭代器](#迭代器模式)， [中介者](#中介者模式)， [状态](#状态模式)， [职责链](#职责链模式)， [`命令`](#命令模式)， [访问者](#访问者)， [备忘录](#备忘录)， [解释器](#解释器模式)

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
定义一系列的算法，把它们一个个封装起来，并且可以相互替换，这就是策略模式.  
如果在一个系统里面有许多类，它们之间的区别仅在于它们的行为，那么使用策略模式可以动态地让一个对象在许多行为中选择一种行为。  

这是一个计算不同绩效的人对应不同的奖金（奖金 = 工资 * 对应的绩效算法）。
```javascript
const strategies = {
  S: function(salary) {
    return salary * 4;
  },
  A: function(salary) {
    return salary * 3;
  },
  B: function(salary) {
    return salary * 2
  }
}

const calculateBonus = function(level, salary) {
  return strategies[level](salary);
}

const staff1 = calculateBonus('S', 10000);
const staff2 = calculateBonus('A', 20000);
```
### 模板方法模式
将公共的代码抽成一个抽象类，子类继承抽象类，并重写相应的方法。模板方法模式是为数不多的基于继承的设计模式。  

下面是基于typescript的抽象类实现:  
```typescript
abstract class Beverage {
  init() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
  boilWater() {
    console.log('把自来水煮沸');
  }
  abstract brew(): void
  abstract pourInCup(): void
  abstract addCondiments(): void
}

class Tea extends Beverage {
  brew() {
    console.log('用沸水浸泡茶叶');
  }
  pourInCup() {
    console.log('把茶倒进杯子里');
  }
  addCondiments() {
    console.log('加点糖');
  }
}

class Coffee extends Beverage {
   brew() {
    console.log('用沸水浸泡咖啡');
  }
  pourInCup() {
    console.log('把咖啡倒进杯子里');
  }
  addCondiments() {
    console.log('加点牛奶');
  }
}

const tea = new Tea();
tea.init();

const coffee = new Coffee();
coffee.init();
```

### 观察者模式
与订阅发布模式相似, 但不完全相同.
- 观察者模式: 发布者需要直接维护订阅者, 直接发消息给订阅者, 类似于奶农送牛奶的关系.  使用场景: Vue的依赖追踪.
- 订阅发布模式: 订阅者和发布者都需要通过调度中心来沟通, 发布者不需要维护订阅者, 只需要维护订阅者的回调函数 , 类似于邮局报社个人的关系.  使用场景: vue组件间通信的EventBus.

观察者模式:
```javascript
class Observer {
  constructor (fn) {
    this.update = fn
  }
}
class Subject {
  constructor () {
    this.observers = []
  }
  addObserver (observer) {
    this.observers.push(observer)
  }
  removeObserver (observer) {
    const delIndex = this.observers.indexOf(observer)
    this.observers.splice(delIndex, 1)
  }
  notify () {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}

var subject = new Subject()
var ob1 = new Observer(function () {
  console.log('ob1 callback run')
})
subject.addObserver(ob1)
var ob2 = new Observer(function () {
  console.log('ob2 callback run')
})
subject.addObserver(ob2)
subject.notify()
```

订阅-发布模式:  
```javascript
class EventBus {
  constructor () {
    this.events = Object.create(null)
  }
  on (event, fn) {
    this.events.event = this.events.event || []
    this.events.event.push(fn)
  }
  off (event, fn) {
    const index = (this.events.event || []).indexOf(fn)
    if (index < -1) {
      return
    } else {
      this.events.event.splice(index, 1)
    }
  }
  fire (event) {
    this.events.event.forEach(fn => fn())
  }
}
var bus = new EventBus()
bus.on('onclick', function () {
  console.log('click1 fire')
})
bus.on('onclick', fn=function () {
  console.log('click2 fire')
})
bus.fire('onclick')
```

### 迭代器模式
指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。分为内部迭代器和外部迭代器。内部迭代器如forEach, map, filter, 外部迭代器如generator函数.
```javascript
class Iterator{
    #obj;
    #curIndex;
    constructor(obj){
        this.#obj = obj;
        this.#curIndex = 0;
    }

    next(){
        return {
            next: this.next,
            value: this.isDone ? this.#obj[this.#curIndex]: this.#obj[this.#curIndex++],
            isDone: this.isDone,
        }
    }
    get isDone() { return this.#curIndex >= this.#obj.length }
}
```

### 中介者模式
应用场景: 机场调度系统; MVC框架(C是M和V的中介者)  
定义一个中介对象来封装一系列对象之间的交互，使原有对象之间的耦合松散，且可以独立地改变它们之间的交互。主要解决各个类之间关系复杂，且每个类都需要知道它要交互的类。这个时候就可以引入中介者，把脏活累活，耦合关系全放到中介者类中。  

以机场调度中心为例:
```javascript
class PlaneCommandTower{
    constructor(channel) {
        this.channel = new Array(channel).fill(false)
    }
    enter(i) {
        if(this.isBusy(i) || i >= this.getChannelCnt()) return false
        this.channel[i] = true
    }
    leave(i) {
        this.channel[i] = false
    }
    isBusy(i) { return this.channel[i] }
    getChannelCnt() { return this.channel.length }
}

class Plane{
    constructor(commander) {
        this.commander = commander
    }
    get channelCnt() { return this.commander.getChannelCnt() }

    land(){
        let i = 0
        while(i < this.channelCnt) {
            if(this.commander.isBusy(i)){
                i++
            } else {
                break
            }
        }
        if(i < this.channelCnt) {
            this.commander.enter(i)
            return true
        }
        return false
    }
}

const commander = new PlaneCommandTower(3);

const plane1 = new Plane(commander);
const plane2 = new Plane(commander);
const plane3 = new Plane(commander);
const plane4 = new Plane(commander);

plane1.land();
plane2.land();
plane3.land();
plane4.land();

```
### 状态模式
在状态模式中，类的行为是基于它的状态改变的。  

以电灯的不同档位的状态为例:
```javascript
class Light{
    constructor(){
        this.status = ['closed', 'opened']
        this.curStatus = 0
    }
    setStatus(status){
        this.status = status
    }
    press(){
        this.curStatus = ++this.curStatus % this.status.length
        console.log(this.status[this.curStatus])
    }
}
const light = new Light()
light.setStatus(['closed', 'weak', 'common', 'environmental']);
light.press(); // weak
light.press(); // common
light.press(); // environmental
light.press(); // closed
```
### 职责链模式
使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止.  
职责链上的处理者负责处理请求，客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递，所以职责链将请求的发送者和请求的处理者解耦了。  
在js中, 无论是作用域链, 原型链, DOM节点的事件冒泡, 都是基于职责链模式实现的.

例子: 天猫每年双11都会做抽奖活动的，比如阿里巴巴想提高大家使用支付宝来支付的话，每一位用户充值500元到支付宝的话，那么可以100%中奖100元红包，充值200元到支付宝的话，那么可以100%中奖20元的红包，当然如果不充值的话，也可以抽奖，但是概率非常低，基本上是抽不到的，当然也有可能抽到的。
```javascript
// 1. orderType(充值类型)，如果值为1的话，说明是充值500元的用户，如果为2的话，说明是充值200元的用户，如果是3的话，说明是没有充值的用户。

// 2. isPay(是否已经成功充值了): 如果该值为true的话，说明已经成功充值了，否则的话 说明没有充值成功；就当作普通用户来购买。

// 3. count(表示数量)；普通用户抽奖，如果数量有的话，就可以拿到优惠卷，否则的话，不能拿到优惠卷。
function order500(orderType,isPay,count){
    if(orderType == 1 && isPay == true)    {
        console.log("亲爱的用户，您中奖了100元红包了");
    }else {
        //我不知道下一个节点是谁,反正把请求往后面传递
        return "nextSuccessor";
    }
};
function order200(orderType,isPay,count) {
    if(orderType == 2 && isPay == true) {
        console.log("亲爱的用户，您中奖了20元红包了");
    }else {
        return "nextSuccessor";
    }
};
function orderNormal(orderType,isPay,count){
    // 普通用户来处理中奖信息
    if(count > 0) {
        console.log("亲爱的用户，您已抽到10元优惠卷");
    }else {
        console.log("亲爱的用户，请再接再厉哦");
    }
}

class Chain {
  constructor(fn) {
    this.fn = fn;
    this.successor = null;
  }

  setNextSuccessor(successor) {
    return this.successor = successor;
  }

  passRequest() {
    const ret = this.fn.apply(this, arguments);
    if (ret === 'nextSuccessor'){
      return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
  }
}

const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);      // 设置下一个节点
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);    // 亲爱的用户，您中奖了100元红包了
chainOrder500.passRequest(2, true, 500);    // 亲爱的用户，您中奖了20元红包了
chainOrder500.passRequest(3, true, 500);    // 亲爱的用户，您已抽到10元优惠卷
chainOrder500.passRequest(1, false, 0);     // 亲爱的用户，请再接再厉哦
```
### 命令模式
命令模式中的命令指的是一个执行某些特定事情的指令。  
命令模式最常见的应用场景是:有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。

下面通过一个按钮的点击事件，触发页面的刷新事件。
```javascript

const button1 = document.createElement('button');
document.body.appendChild(button1);

const setCommand = function(button, func) {
  button.onclick = function() {
    func();
  };
};
const MenuBar = {
  refresh: function() {
    console.log("刷新菜单界面");
  }
};
const RefreshMenuBarCommand = function(receiver) {
  return function() {
    receiver.refresh();
  };
};

const refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshMenuBarCommand);

button1.click();
```
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
[Javascript设计模式详解](https://www.cnblogs.com/tugenhua0707/p/5198407.html#_labe4)
[设计模式之美-前端](https://zhuanlan.zhihu.com/p/111553641)