/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let mid = parseInt((left + right) / 2)
        if(nums[mid] === target) return mid
        if(nums[mid] >= nums[0]) {
            if(target >= nums[0] && nums[mid] > target) {
                right = mid - 1
            } else {
                left = mid + 1
            }

        }else if(nums[mid] <= nums[nums.length - 1]) {
            if (target <= nums[nums.length - 1] && nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return nums[left] === target ? left : -1
};
// @lc code=end

// console.log(search([4, 5, 6, 7, 0, 1, 2], 0)) // 4
// console.log(search([1], 0)) // -1
// console.log(search([1, 3], 3)) // 1
// console.log(search([1, 3], 1)) // 0