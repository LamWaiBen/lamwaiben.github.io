/**
 * 快速排序
 *
 * 二分法; 在当前序列取中间点, 通过与中间点比较大小, 把数组分为两半, 然后再分别对得到的两数组做同样的操作, 最后把所有数组按合并
 */

let arr = [9, 5, 3, 2, 1, 1, 5, 4, 2, 6, 8, 1, 0, -1, 55, 1, 2, 44, 87, 623, 1, 25, 3, 6, 4]
function exchange(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]]
}




// 非原地
function quick(originArr) {
    if(originArr.length <= 1) return originArr
    
    let arr = [...originArr]
    let left = []
    let right = []
    
    // let pivot = ~~(arr.length / 2)
    // let center = [arr[pivot]]
    // for(let i = 0; i < pivot; i++){
    //     if (arr[i] > center[0]) {
    //         left.push(arr[i])
    //     } else if (arr[i] == center [0]) {
    //         center.push(arr[i])
    //     } else {
    //         right.push(arr[i])
    //     }
    
    //     let j = Math.min(pivot + 1 + i, arr.length - 1)
    //     if (arr[j] < center[0]) {
    //         right.push(arr[j])
    //     } else if (arr[j] == center[0]) {
    //         center.push(arr[i])
    //     } else {
    //         left.push(arr[j])
    //     }
    // }

    let pivotElement = arr.shift()
    let center = [pivotElement]
    while (arr.length) {
        let curElement = arr.shift()
        if(curElement > pivotElement) left.push(curElement)
        else if(curElement == pivotElement) center.push(curElement)
        else right.push(curElement)
    }

    return quick(left).concat(center, quick(right))
    

}

console.log("quick: ", quick(arr))


// 以某个值为划分点 分割数组, 返回划分点的索引
function partitionArray (arr, lowIndex, highIndex){
    const pivot = arr[highIndex]                    // 取highIndex的值为划分点
    let partitionIndex = lowIndex

    for(let curIndex = lowIndex; curIndex < highIndex; curIndex++){
        if(arr[curIndex] > pivot){                  // 比划分值大的值都会移到划分点的左边
            exchange(arr, curIndex, partitionIndex)
            partitionIndex += 1
        }
    }
    exchange(arr, partitionIndex, highIndex)        // 把划分值移到正确的划分点位置, 使得所有比它大的值都在左边, 比它小的值都在右边
    return partitionIndex
}

/**
 * 原地快排
 * @param {Number[]} arr 
 * @param {number} lowIndex 
 * @param {number} highIndex 
 */
function quickInPlace(arr, lowIndex = 0, highIndex = arr.length - 1) {
    if (lowIndex < highIndex) {
        const partitionIndex = partitionArray(arr, lowIndex, highIndex) // 根据返回的划分点递归
        quickInPlace(arr, lowIndex, partitionIndex - 1)
        quickInPlace(arr, partitionIndex + 1, highIndex)
    }

	return arr
}

console.log("quickInPlace: ", quickInPlace(arr))