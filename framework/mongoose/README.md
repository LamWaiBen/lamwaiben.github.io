
### 记录mongoose常用的方法

- 概念

    先对比一下mongodb 与 Oracle数据库之间的异同

    | Oracle | MongoDB | Mongoose |
    | ------ | ------ | ------ |
    | 数据库实例(database instance) | MongoDB实例 |Mongoose |
    |模式(schema) | 数据库(database) | mongoose |
    |表(table) | 集合(collection) | 模板(Schema)+模型(Model) |
    |行(row) | 文档(document) | 实例(instance) |
    |rowid | _id | _id |
    | Join | DBRef | DBRef |

    mongoose的基本概念:
    - Schema: 相当于一个数据库的模板. Model可以通过mongoose.model 集成其基本属性内容. 当然也可以选择不继承.
    - Model: 基本文档数据的父类,通过集成Schema定义的基本方法和属性得到相关的内容.
    - instance: 这就是实实在在的数据了. 通过 new Model()初始化得到.



- 定义Schema

    Schema的基本类型有:
    - String
    - Number
    - Date
    - Buffer
    - Boolean
    - Mixed
    - ObjectId
    - Array
    其中Mixed和ObjectId为mongoose特有

    ```javascript
    // 定义
    let schema = new Schema({
        name:    String,
        binary:  Buffer,
        living:  Boolean,
        updated: { type: Date, default: Date.now },
        age:     { type: Number, min: 18, max: 65 },
        mixed:   Schema.Types.Mixed,
        _someId: Schema.Types.ObjectId,
        array:      [],
        ofString:   [String],       // 字符串数组
        ofNumber:   [Number],
        ofDates:    [Date],
        ofBuffer:   [Buffer],
        ofBoolean:  [Boolean],
        ofMixed:    [Schema.Types.Mixed],
        ofObjectId: [Schema.Types.ObjectId],
        nested: {
            stuff: { type: String, lowercase: true, trim: true }
        }
    })

    // 使用
    let Thing = mongoose.model('Thing', schema);

    let m = new Thing;
    m.name = 'Statue of Liberty';
    m.age = 125;
    m.updated = new Date;
    m.binary = new Buffer(0);
    m.living = false;
    m.mixed = { any: { thing: 'i want' } };
    m.markModified('mixed');                    // 修改了mixed之后需要调用markModified(path)才会生效
    m._someId = new mongoose.Types.ObjectId;    // _id 的一个映射
    m.array.push(1);
    m.ofString.push("strings!");
    m.ofNumber.unshift(1,2,3,4);
    m.ofDates.addToSet(new Date);
    m.ofBuffer.pop();
    m.ofMixed = [1, [], 'three', { four: 5 }];
    m.nested.stuff = 'good';
    m.save(callback);
    ```



- 自定义Schema.method

    可以在Schema.method上定义方法,在Model的doc实例上使用该方法
    ```javascript
        let animalSchema = new Schema({ name: String, type: String });
        // 添加一个fn. 
        animalSchema.methods.findSimilarTypes = function (cb) {
            //这里的this指的是具体document上的this
            return this.model('Animal').find({ type: this.type }, cb);
        }
    ```

    假如我们希望自定义一些查询方法, 则需要把这个方法定义在Model上面, 我们可以使用 statics,
    ```javascript
        // 给model添加一个findByName方法
        animalSchema.statics.findByName = function (name, cb) {
            //这里的this 指的就是Model
            return this.find({ name: new RegExp(name, 'i') }, cb);
        }

        let Animal = mongoose.model('Animal', animalSchema);
        Animal.findByName('fido', function (err, animals) {
            console.log(animals);
        });
    ```

- Model



- queries  查询     
    1. 逻辑操作符   
        - $or 或, 表达式最好支持索引
            ```
            db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )  
            // 所有字段quantity小于20或者price等于10的所有文档
            ```
        - $and 并
            ```
            db.inventory.find( {
                $and : [
                    { $or : [ { price : 0.99 }, { price : 1.99 } ] },
                    { $or : [ { sale : true }, { qty : { $lt : 20 } } ] }
                ]
            } )
            // price字段值等于0.99或1.99并且sale字段值为true或者qty小于20的所有文档
            ```
        - $not 非或不存在
            ```
            db.inventory.find( { price: { $not: { $gt: 1.99 } } } )
            // price字段小于等于1.99或者price不存在
            ```
        - $nor 或not
            ```
            db.inventory.find( { $nor: [ { price: 1.99 }, { qty: { $lt: 20 } }, { sale: true } ] }
            // 字段price不等于1.99，字段qty不小于20，字段sale不等于true;查询的结果包含不存在的字段
            ```
    2. 比较操作符
        - > $gt , >= $gte, < $lt, <= $lte, != $ne

    3. $in 与 $nin
    

- validation 校验




- population 联表



- middleware 中间件(前/后置钩子)


参考:

- [深入浅出mongoose](https://www.cnblogs.com/chris-oil/p/9142795.html)