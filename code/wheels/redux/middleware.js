
// 简单的log中间件
function logger(store) {
    // 相当于把 store.dispatch 包了一层日志代码, 返回一个新的dispatch函数
    // 使用方法 store.dispatch = log(store)
    // let next = store.dispatch
    // return action => {
    //     console.log('log start')
    //     let result = next(action)
    //     console.log('log end state:', store.getState())
    //     return result
    // }

    // 更好的, 支持链式调用的实现
    // next/dispatch 作为参数穿进去, 并返回一个 dispatch函数
    // 使用方法: store.dispatch = log(store)(next)
    return next => action => {
        console.log('log start')
        let result = next(action)
        console.log('log end state:', store.getState())
        return result
    }
}

function crashReporter(store) {
    return next => action => {
        try {
            return next(action)
        } catch (error) {
            console.log("catch error", error, action, store.getState())
        }
    }
}

// 简单的异步中间件
function chunk(store) {
    return next => action => {
        // 如果传入的action 为函数, 则说明是异步函数, 在把dispatch丢出去在action中触发
        if(typeof action === "function") {
            return action(store.dispatch, store.getState)
        }
        return next(action)
    }
}

module.exports = { logger, crashReporter, chunk }