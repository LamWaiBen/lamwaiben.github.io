
const combineReducers = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((newState, key) => {
            newState[key] = reducers[key](state[key], action)
            return newState
        }, {})
    }
}
module.exports = { combineReducers }