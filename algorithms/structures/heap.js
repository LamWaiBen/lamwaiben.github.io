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

    compare(v1, v2) {
        throw new Error('方法未实现')
    }

    build(list){
        
    }

    insert(v){

    }

    remove(){

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