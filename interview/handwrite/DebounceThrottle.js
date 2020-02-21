/* 
    防抖和节流
*/

// 防抖, 停止抖动一定时间后再执行
function debounce(func, delay){
    let timeId = null
    return (...args) => {
        if (timeId) clearTimeout(timeId)
        timeId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

// 节流, 一定时间范围内只执行一次
function throttle(func, delay){
    let timeId = null
    return (...args) => {
        if (!timeId) {
            func(...args)
            timeId = setTimeout(() => {
                timeId = null
            }, delay)
        }
    }

}


// 测试

