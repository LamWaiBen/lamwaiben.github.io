/**
 * 实现数组的一些原生方法
 */


 /**
  * Array.prototype.splice(start, deleteCount , ...items)
  * start: 可以小于0
  * deleteCount: 小于等于0时表示不删除
  */
Array.prototype._splice = function splice(start, deleteCount = this.length - start, ...addItems) {
    while (start < 0) {
        start = this.length + start
    }
    if (start > this.length) start = 0

    let restItems = addItems.concat(this.slice(start + deleteCount))
    let removeItems = this.slice(start, start + deleteCount)

    let addIndex = start
    for (let v of restItems) {
        this[addIndex++] = v
    }
    this.length = addIndex
    return removeItems
}
// test case
var a = [1, 2, 3, 4, 5, 6]
var b = [1, 2, 3, 4, 5, 6]
console.log('splice', a.splice(3), a)
console.log('_splice', b._splice(3), b)