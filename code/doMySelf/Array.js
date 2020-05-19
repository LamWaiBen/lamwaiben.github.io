/**
 * 实现数组的一些原生方法
 */


 /**
  * Array.prototype.splice(start, deleteCount , ...items)
  * start: 可以小于0
  * deleteCount: 小于等于0时表示不删除
  */
Array.prototype._splice = function splice(start, deleteCount = this.length - start, ...items) {
    while (start < 0) {
        start = this.length + start
    }
    let tmp = items.slice()
    let res = []
    let count = deleteCount
    for (let i = start; i < this.length; i++) {
        if (count > 0) {
            count--
            res.push(this[i])
        } else {
            tmp.push(this[i])
        }
    }
    this.length = start
    for (let v of tmp) {
        this.push(v)
    }

    return res
}
// test case
var a = [1, 2, 3, 4, 5, 6]
var b = [1, 2, 3, 4, 5, 6]
console.log('splice', a.splice(3), a)
console.log('_splice', b._splice(3), b)