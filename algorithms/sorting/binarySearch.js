/**
 * 二分查找
 * 左闭右开: [left, right)
 */

function binarySearch(arr, target) {
    let left = 0, right = arr.length;
    while (left < right) {
        let mid = parseInt((left + right) / 2)
        if(arr[mid] === target) {
            return mid;
        } else if(arr[mid] < target) {
            right = mid
        } else if(arr[mid] > target) {
            left = mid + 1
        }
    }

    return -1
}