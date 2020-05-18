/**
 * 排序算法
 * 
 */

const arr = [2, 6, 4, 1, 3, 9, 5, 8, 7, 0];
Array.prototype.exchange = function(i, j) {
    let tmp = this[i]
    this[i] = this[j]
    this[j] = tmp
}


// 1. 选择排序: 在剩余值中找到最值,然后才交换位置
function selectSort(arr) {
    let compareTimes = 0
    let exchangeTimes = 0
    arr = arr.slice(0)
    for(let i = arr.length - 1; i > 0; i--) {
        let maxIndex = i
        for(let j = i - 1; j >= 0; j--) {
            compareTimes += 1
            if(arr[j] > arr[maxIndex]) {
                maxIndex = j
            }
        }
        if(maxIndex != i) {
            exchangeTimes += 1
            arr.exchange(i, maxIndex)
        }
    }

    console.log('selectSort:  compareTimes: %d, exchangeTimes: %d',compareTimes, exchangeTimes, arr)
}
selectSort(arr)

// 2. 冒泡排序: 相邻元素的比较
function bubbleSort(arr) {
    let compareTimes = 0
    let exchangeTimes = 0
    arr = arr.slice(0)
    for(let i = arr.length - 1; i > 0; i--) {
        for(let j = 0; j < i; j++) {
            compareTimes += 1
            if(arr[j] > arr[j + 1]) {
                exchangeTimes += 1
                arr.exchange(j, j + 1)
            }
        }
    }

    console.log('bubbleSort:  compareTimes: %d, exchangeTimes: %d',compareTimes, exchangeTimes, arr)
}
bubbleSort(arr)

// 3. 插入排序: 随机一个元素在有序序列中比较, 找到适合的位置然后插入(指针跟着比较元素一起移动)
//    基本有序的情况下效率较高, 衍生出<希尔排序>
function insertSort(arr) {
    let compareTimes = 0
    let exchangeTimes = 0
    arr = arr.slice(0)
    for(let i = 1; i < arr.length; i++) {
        let insertIndex = i
        let tmp = arr[insertIndex]
        compareTimes += 1
        while(insertIndex > 0 && tmp < arr[insertIndex - 1]) {
            exchangeTimes += 1
            arr[insertIndex] = arr[insertIndex - 1]
            insertIndex -= 1
        }
        arr[insertIndex] = tmp
    }

    console.log('insertSort:  compareTimes: %d, exchangeTimes: %d',compareTimes, exchangeTimes, arr)
}
insertSort(arr)

// 4. 快速排序  nlogn
function quickSort(arr, info) {
    // 简单版
    if(!arr.length) return arr
    arr = arr.slice()
    let pivot = arr.shift()
    let left = []
    let right = []
    for(let v of arr) {
        info.compareTimes += 1
        info.exchangeTimes += 1
        if(v > pivot) {
            right.push(v)
        } else {
            left.push(v)
        }
    }

    return quickSort(left, info).concat(pivot, quickSort(right, info))
}
let quickInfo =  { compareTimes: 0, exchangeTimes: 0 }
let res = quickSort(arr, quickInfo)
console.log('quickSort:  compareTimes: %d, exchangeTimes: %d', quickInfo.compareTimes, quickInfo.exchangeTimes, res)

// 4.2 快速排序 原地版
function quickSortInPlace(arr, inputLowIndex = 0, inputHeightIndex = arr.length - 1) {

    // 原地交换版: 给定遍历范围
    function partitionArray(lowIndex, heighIndex) {
        let pivot = arr[heighIndex] // 随机取得基准值, 遍历之后会把它交换到partitionIndex对于的位置中
        let partitionIndex = lowIndex
        while(lowIndex < heighIndex) { 
            if(arr[lowIndex] < pivot) {     // 比基准值小的, 交换到基准点的左边
                arr.exchange(lowIndex, partitionIndex)
                partitionIndex += 1
            }
            lowIndex += 1
        }

        arr.exchange(partitionIndex, heighIndex)
        return partitionIndex
    }
    
    if(inputLowIndex < inputHeightIndex) {
        let partitionIndex = partitionArray(inputLowIndex, inputHeightIndex);
        quickSortInPlace(arr, inputLowIndex, partitionIndex - 1)
        quickSortInPlace(arr, partitionIndex + 1, inputHeightIndex)
    }
    return arr
}
console.log('quickSortInPlace', quickSortInPlace(arr))

// 5. 希尔排序  插入排序的升级版  nlogn
//    给插入排序设置 gap , 降低时间复杂度
function shellSort(arr) {
    arr = arr.slice()
    let compareTimes = 0
    let exchangeTimes = 0
    let gap = arr.length
    while(gap > 1) {
        gap = parseInt((gap / 3  + 1))
        for(let i = 1; i < arr.length; i += gap) {
            let tmp = arr[i]
            let insertIndex = i
            while(insertIndex - gap >= 0 && tmp < arr[insertIndex - gap]) {
                compareTimes += 1
                exchangeTimes += 1
                arr[insertIndex] = arr[insertIndex - gap]
                insertIndex -= gap
            }
            arr[insertIndex] = tmp
        }
    }

    console.log('shellSort:  compareTimes: %d, exchangeTimes: %d',compareTimes, exchangeTimes, arr)
}
shellSort(arr)

// 6. 堆排序 选择排序的升级版
//    利用最小堆/最大堆的特性(完全二叉树, 根元素大/小于子元素, 可以用数组表达),  ki < k(2i)/k(2i + 1)  
function getMinHeap(arr) {
    let heap = []
    for(let i = 0; i < arr.length; i++) {
        heap.push(arr[i])
        let childIndex = i
        let parentIndex = parseInt((childIndex - 1) / 2)
        while(heap[childIndex] < heap[parentIndex]) {
            heap.exchange(childIndex, parentIndex)
            childIndex = parentIndex
            parentIndex = parseInt((childIndex - 1) / 2)
        }
    }
    return heap
}
function heapSort(arr) {
    let minHeap = getMinHeap(arr)
    arr = []
    while(minHeap.length) {
        arr.push(minHeap[0])
        // console.log('heapSort', arr, minHeap)
        // 最小堆取出根节点后, 用末尾节点替换后, 需要重新计算节点排列, 根据 根节点i < 子节点 2i 和 根节点i < 子节点 2i + 1 的规律
        let item = minHeap.pop()
        if(minHeap.length > 0) minHeap[0] = item
        let index = 1 - 1
        let leftChildIndex = 2 * 1 - 1
        let rightChildIndex = 2 * 1
        if(!minHeap[leftChildIndex] && !minHeap[rightChildIndex]) continue;
        while(minHeap[leftChildIndex] || minHeap[rightChildIndex]) {
            if(minHeap[rightChildIndex] && minHeap[rightChildIndex] < minHeap[leftChildIndex] && minHeap[index] > minHeap[rightChildIndex]) {
                // console.log('right ', index, leftChildIndex, rightChildIndex, minHeap)
                minHeap.exchange(index, rightChildIndex)
                index = rightChildIndex
            } else if(minHeap[index] > minHeap[leftChildIndex]) {
                // console.log('left ', index, leftChildIndex, rightChildIndex, minHeap)
                minHeap.exchange(index, leftChildIndex)
                index = leftChildIndex
            } else {
                break
            }
            leftChildIndex = 2 * (index + 1) - 1
            rightChildIndex = 2 * (index + 1)
        }
    }
    console.log('heapSort', arr)
}
// console.log(getMinHeap(arr))
heapSort(arr)



// 7. 归并排序: 把数组拆分, 排序 再合并
function mergeSortedArray(arr1, arr2){
    let arr = []
    while(arr1.length && arr2.length) {
        if(arr1[0] < arr2[0]) {
            arr.push(arr1.shift())
        } else {
            arr.push(arr2.shift())
        }
    }
    if(arr1.length) {
        arr = arr.concat(arr1)
    }
    if(arr2.length) {
        arr = arr.concat(arr2)
    }
    return arr
}
function mergeSort(arr) {
    if(arr.length <= 1) return arr
    let midIndex = parseInt(arr.length / 2)
    let left = mergeSort(arr.slice(0 , midIndex))
    let right = mergeSort(arr.slice(midIndex, arr.length))
    return mergeSortedArray(left, right)
}
console.log('mergeSort: ', mergeSort(arr))