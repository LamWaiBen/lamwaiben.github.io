# Redux
## 工作原理
1. 通过 `createStore(reducer)`, 生成一个store对象(带有getState, dispatch, subscribe方法.), 同时会初始化state值
2. 通过 `dispatch(action)`, 会触发创建时传入的`reducer`, 即 `reducer(state, action)`
3. reducer执行完毕后,会调用通过`subscribe`订阅的方法
4. `combineReducers({a, b})` 实际上是返回一个新的reducers函数, 当这个新reducers执行的时候, 函数内部会通过遍历`Object.keys(reducers)`的途径, 使所有reducer都会执行且更新其对应的state

## 中间件

### step1: 分析中间件发挥作用的地方
redux一共由3部分组成: reducer, action, dispatch.
1. 由于reducer是纯函数, 所以不能加入异步操作, 
2. action是一个纯对象, 也没办法放入异步操作
3. 所以只能以dispatch为切入点

### step2: 中间件的参数与返回值
既然中间件作用于dispatch上, 借助纯函数的思想
1. 可以中间件的实现可以把dispatch包裹起来, 并返回一个新的dispatch
2. 中间件中也可能需要获取state, 所以store也需要作为参数传入中间件
3. 基于以上两点, 可以得到基本形式:   
    ```javascript
    function middleware (store) {
        // next 为 dispatch函数
        return next => action => {
            // do something
            let result = next(action)
            // do something
            return result       // dispatch(action) 后, 会返回新的state
        }
    }

    ```

### step3: 异步中间件
由于异步方法, 要求异步返回结果后再执行dispatch, 所以需要把dispatch暴露出去
1. 判断action为函数的时候, 则认为其是异步函数
2. 把dispatch和getState作为参数, 暴露给 action且执行, 在action中异步结束后执行dispatch函数