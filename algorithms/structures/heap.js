/**
 * 最大堆/最小堆的实现
 * 
 * 
 */
class Heap {
    constructor(){
        this.list = []
    }

    getParent(i) {
        return (i / 2) | 0
    }
    getLeft(i) {
        return i * 2
    }
    getRight(i) {
        return i * 2 + 1
    }

    getLength(){
        return this.list.length
    }

    compare(v1, v2) {
        throw new Error('方法未实现')
    }

    swap(i, j) {
        [this.list[i], this.list[j]] = [this.list[j], this.list[i]]
    }

    build(list){
        for(let v of list){
            this.insert(v)
        }
    }

    insert(v){
        let index = this.getLength()
        this.list[index] = v
        let parentIndex = this.getParent(index)
        while (this.compare(this.list[index], this.list[parentIndex])) {
            this.swap(index, parentIndex)
            index = parentIndex
            parentIndex = this.getParent(index)
        }
    }

    remove(){
        let index = 0
        this.list[index] = this.list.pop()
        let rIndex = this.getLeft(index)
        let lIndex = this.getRight(index)
        let LENGTH = this.getLength()
        while (
            (lIndex <= LENGTH && this.compare(this.list[lIndex], this.list[index]))
            || (rIndex <= LENGTH && this.compare(this.list[rIndex], this.list[index]))
        ) {
            if (this.compare(this.list[lIndex], this.list[index])) {
                this.swap(lIndex, index)
                index = lIndex
                rIndex = this.getLeft(index)
                lIndex = this.getRight(index)
            } else if (this.compare(this.list[rIndex], this.list[index])) {
                this.swap(rIndex, index)
                index = rIndex
                rIndex = this.getLeft(index)
                lIndex = this.getRight(index)
            }
        }
    }
}

class MaxHeap extends Heap{
    constructor() {
        super()
    }

    compare(parentVal, childVal) {
        return parentVal > childVal
    }
}
class MinHeap extends Heap{
    constructor() {
        super()
    }

    compare(parentVal, childVal) {
        return parentVal < childVal
    }
}