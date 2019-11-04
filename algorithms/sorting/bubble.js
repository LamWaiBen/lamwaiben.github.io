/**
 * 冒泡排序
 * 
 * 相邻的元素比较
 */

 
let arr = [9, 5, 3, 2, 1, 1, 5, 4, 2, 6, 8, 1, 0, -1, 55, 1, 2, 44, 87, 623, 1, 25, 3, 6, 4]
function exchange(arr, i, j){
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

function bubble(arr){
    for(let i = arr.length - 1; i > -1; i--){
        for(let j = 0; j < i; j++){
            if(arr[j] < arr[j + 1]) exchange(arr, j, j + 1)
        }
    }
}