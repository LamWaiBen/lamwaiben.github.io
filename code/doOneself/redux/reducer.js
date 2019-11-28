const initState = {
   a: 1 
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD" :
            return {
                a: state.a + 1
            }
        case "ERR": {
            throw Error("action: ERR!")
        }
        case "ASYNC": {
            return {
                a: "async"
            }
        }
        default: 
            return state
    }
}

module.exports = reducer