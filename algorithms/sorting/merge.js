/**
 * 归并排序: 分治的思想, 把左右数组逐项比较, 知道数组中只有一个元素时算比较结束
 * 时间复杂度: n log(n)
 * 空间复杂度: n
 */

let arr = [9, 5, 3, 2, 1, 1, 5, 4, 2, 6, 8, 1, 0, -1, 55, 1, 2, 44, 87, 623, 1, 25, 3, 6, 4]
function exchange(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

function merge(arr){
    if(arr.length <= 1) return arr
    const midIndex = Math.floor(arr.length / 2)
    const leftSortedArr = merge(arr.slice(0, midIndex))
    const rightSortedArr = merge(arr.slice(midIndex, arr.length))

    return combineArr(leftSortedArr, rightSortedArr)
}

function combineArr(leftArr, rightArr){
    let arr = [];
    while (leftArr.length && rightArr.length) {
        if(leftArr[0] > rightArr[0]) {
            arr.push(leftArr.shift())
        } else {
            arr.push(rightArr.shift())
        }
    }

    if(leftArr.length) {
        arr = arr.concat(leftArr)
    }
    if(rightArr.length) {
        arr = arr.concat(rightArr)
    }

    return arr
}


console.log('merge sort', merge(arr))