// 返回数组的交集
// 计算两个数组的交集,  再拿交集与第三个数组比较
function array_intersection(...arrList) {
    let lastIntersection;
    let set = new Set(arrList[0])
    let i = arrList.length
    while (i--) {
        lastIntersection = new Set()
        let arr = arrList[i]
        for (let v of arr) {
            if (set.has(v)) {
                lastIntersection.add(v)
            }
        }
        set = lastIntersection
    }
    return [...lastIntersection]
}



Array.prototype.bflat = function(){
    return this.reduce((acc, cur) => {
        return acc.concat(cur instanceof Array ? cur.bflat() : cur)
    }, [])
}