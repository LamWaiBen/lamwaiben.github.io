/**
 * 完全二叉树: 除了最后一层节点, 其余层次都是满节点的; 节点从左到右排序
 * 特性: 
 *  1. 可以用数组表示
 *  2. 如果知道一个节点的序号为i,  那么其父节点: arr[i/2], 左子节点: arr[2i], 右子节点: arr[2i + 1]
 * 
 * 可以实现: 最大堆(maxHeap)/最小堆(minHeap)
 */



/**
 * 最小堆
 */
const minHeap = []
function insert(key) {
    minHeap.push(key)
    let i = minHeap.length - 1
    while (i / 2 > 0 && minHeap[i] < minHeap[i / 2]) {
        [minHeap[i], minHeap[i / 2]] = [minHeap[i / 2], minHeap[i]]
        i = i / 2
    }
}


/**
 * 求数组的前K个最大值
 */
// 1. 全排序后截取前K个值
// 2. 局部排序, 冒泡排序冒K个泡后, 则得到前K个最大值
// 3. 利用堆(最小堆)算法
//      用前K个元素生成最小堆, K+1的元素去跟堆顶比较, 若比堆顶大, 则替换堆顶元素, 并重新调整堆(维持最小堆的状态)
const randomArr = [1, 2, 3, 4, 9, 8, 7, 6, 5]
const K = 5
class MinHeap {
    constructor(arr) {
        this.arr = arr
        this.build()
    }
    leftIndex(i) {
        return parseInt(i * 2 + 1)
    }
    rightIndex(i) {
        return parseInt(i * 2 + 2)
    }
    parentIndex(i) {
        return parseInt((i - 1) / 2)
    }

    build() {
        for (let i = 1; i < this.arr.length; i++) {
            let t = i
            while (t != 0 && this.arr[this.parentIndex(t)] > this.arr[t]) {
                let tmp = this.arr[t]
                this.arr[t] = this.arr[this.parentIndex(t)]
                this.arr[this.parentIndex(t)] = tmp
                t = this.parentIndex(t)
            }
        }
    }

    ajust(n) {
        if (n < this.arr[0]) {
            return
        }
        let t = 0
        this.arr[t] = n
        while ((this.leftIndex(t) < this.arr.length && n > this.arr[this.leftIndex(t)]) 
            ||(this.rightIndex(t) < this.arr.length && n > this.arr[this.rightIndex(t)])) {
            if (n > this.arr[this.leftIndex(t)]) {
                let tmp = this.arr[t]
                this.arr[t] = this.arr[this.leftIndex(t)]
                this.arr[this.leftIndex(t)] = tmp
                t = this.leftIndex(t)
            } else if (n > this.arr[this.rightIndex(t)]) {
                let tmp = this.arr[t]
                this.arr[t] = this.arr[this.rightIndex(t)]
                this.arr[this.rightIndex(t)] = tmp
                t = this.rightIndex(t)
            }
        }
    }
}

const topKMinHeap = new MinHeap(randomArr.slice(0, K))
for (let i = K; i < randomArr.length; i++) {
    topKMinHeap.ajust(randomArr[i])
}
console.log(topKMinHeap)