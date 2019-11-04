/**
 * 插入排序
 * 
 * (从小到大排序)
 * 从未排序列中按顺序取一个值出来, 拿到已排序列中排序(类似于冒泡那样一步一步排)
 */

let arr = [9, 5, 3, 2, 1, 1, 5, 4, 2, 6, 8, 1, 0, -1, 55, 1, 2, 44, 87, 623, 1, 25, 3, 6, 4]
function exchange(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]]
}

function insert(arr) {
    for(let i = 0; i < arr.length; i++){
        let curIndex = i

        while (curIndex > 0 && arr[curIndex] > arr[curIndex - 1]) {
            exchange(arr, curIndex, curIndex - 1)
            curIndex -= 1
        }
    }
    return arr
}

console.log(insert(arr))