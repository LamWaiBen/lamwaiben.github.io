/**
 * 插入排序
 * (从小到大排序)
 * 从未排序列中按顺序取一个值出来, 拿到已排序列中排序(类似于冒泡那样一步一步排)
 * 时间复杂度: n^2
 * 空间复杂度: 1
 */

let arr = [9, 5, 3, 2, 1, 1, 5, 4, 2, 6, 8, 1, 0, -1, 55, 1, 2, 44, 87, 623, 1, 25, 3, 6, 4]
function exchange(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]]
}

function insert(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j -= 1) {
            if (arr[j] > arr[j - 1]) {
                exchange(arr, j, j - 1)
            }
        }
    }
    return arr
}

console.log('insert sort', insert(arr))



/**
 * 希尔排序(间隔可控的的插入排序)
 * 时间复杂度: nlog(m)      m 是gap
 * 空间复杂度: 1
 */

function shell(arr) {
    let gap = Math.floor(arr.length / 2)
    while (gap > 0) {
        for (let i = gap; i < arr.length; i++) {
            for (let j = i; j > 0; j -= gap) {
                if(arr[j] > arr[j - gap]) {
                    exchange(arr, j, j - gap)
                }
            }
        }
        gap = Math.floor(gap / 2)
    }
    return arr
}
console.log('shell sort', shell(arr))