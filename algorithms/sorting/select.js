/**
 * 选择排序
 * 每一次遍历都找到最小/大 值, 然后把他排到末端
 * 
 */

let arr = [9, 5, 3, 2, 1, 1, 5, 4, 2, 6, 8, 1, 0, -1, 55, 1, 2, 44, 87, 623, 1, 25, 3, 6, 4]
function exchange(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]]
}


function select(arr) {
    for(let i = 0; i < arr.length - 1; i++){
        let p = i
        for(let j = p; j < arr.length; j++){
            if(arr[p] < arr[j + 1]){
                p = j + 1
            }
        }
        exchange(arr, i, p)
    }
}

select(arr)