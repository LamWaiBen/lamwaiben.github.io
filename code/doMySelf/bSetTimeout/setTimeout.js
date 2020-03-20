// 浏览器环境下实现setTimeout
let { bSetTimeout, bClearTimeout } = (function() {
    let hash = {}
    let bSetTimeout = (fn, ms)=>{
        let id = parseInt(Math.random()* 1000000)
        hash[id] = {
            _startTime: Date.now(),     // 记录定时器开启时间
            _timer: null,
            run(){
                this._timer = window.requestAnimationFrame(()=>{
                    if (Date.now() - this._startTime < ms){
                        this.run()
                    }else{
                        fn.call(this, this._timer)
                        window.cancelAnimationFrame(this._timer)
                        delete hash[id]
                    }
                })
            },
            clear(){
                window.cancelAnimationFrame(this._timer)
                delete hash[id]
            }
        }
        hash[id].run()
        return id
    }

    let bClearTimeout = id => {
        let timeout = hash[id]
        timeout && timeout.clear()
    }

    return { bSetTimeout, bClearTimeout }
})()


