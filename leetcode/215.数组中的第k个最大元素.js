/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const minHeap = Array(k).fill(-Infinity)   // 维护一个 小顶堆
    
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] > minHeap[0]) {
            minHeap[0] = nums[i]
            minheapify(minHeap, k, 0)
        }
    }
    
    return minHeap[0]
};

function minheapify(arr, k, i) {
    // 堆是 完全二叉树 节点i, 父节点 i/2 , 左子节点 2i , 右子节点 2i + 1
    while (true) {
        let minIndex = i;
        let leftIndex = 2 * i, rightIndex = 2 * i + 1;
        if(leftIndex <= k && arr[leftIndex] < arr[minIndex]) {
            minIndex = leftIndex
        }
        if(rightIndex <= k && arr[rightIndex] < arr[minIndex]) {
            minIndex = rightIndex
        }
        if(minIndex != i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
            i = minIndex
        } else {
            break
        }
    }
}

// @lc code=end

// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))  // 5
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))  // 4