// 用setTimeout实现setInterval
let { bSetInterval, bClearInterval } = (function(){
    let hash = {}
    let bSetInterval = function(fn, ms) {
        let id = parseInt(Math.random() * 1000000)
        hash[id] = {
            _timer: 0,
            run(){
                let _fn = () => {
                    this._timer = setTimeout(()=>{
                        fn.call(this, this._timer)
                        _fn()
                    }, ms)
                }
                _fn()
            },
            clear(){
                clearTimeout(this._timer)
                delete hash[id]
            }
        }

        hash[id].run()
        return id
    }

    let bClearInterval = function(id){
        let interval = hash[id]
        if (interval) interval.clear()
    }

    return { bSetInterval, bClearInterval }
})()