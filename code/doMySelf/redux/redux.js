function createStore (reducer, middlewares) {
    let listeners = []
    let state
    const store = {
        getState: () => state,

        dispatch: action => {
            state = reducer(state, action)          // 每一个reducer都必定会返回state
            listeners.forEach(listener => listener())   // 发布消息
        },

        subscribe: listener => {
            listeners.push(listener)
            return () => {
                listeners = listeners.filter(l => l !== listener)
            }
        }
    }

    if (middlewares) store.dispatch = middlewares(store)(store.dispatch)

    store.dispatch({})    // 传入空action, 初始化state

    return store
}

function applyMiddleware(...middlewares) {
    // 返回一个接受store, 返回dispatch的函数
    return store => next => {
        return middlewares.reduce((next, m) => {
            return m(store)(next)
        }, next)
    }
}


module.exports = { createStore, applyMiddleware }