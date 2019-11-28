const reducer = require('./reducer')
const { createStore, applyMiddleware } = require('./redux')
const { combineReducers } = require('./combineReducers')
const { logger, crashReporter, chunk } = require('./middleware')

const reducers = combineReducers({ reducer })
let store = createStore(reducers, applyMiddleware(logger, crashReporter, chunk))

store.subscribe(() => {
    console.log('triggle listener!')
    // component.setState(store.getState())
})

store.dispatch({
    type: "ADD"
})

store.dispatch({
    type: "ERR"
})

store.dispatch((dispatch, getState)=> {
    setTimeout(() => {
        dispatch({
            type: "ASYNC"
        })
        console.log("after async", getState())
    }, 1000)
    console.log("before async", getState())
})
