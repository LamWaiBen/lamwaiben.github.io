/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let count = 1;
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] != nums[i - 1]) {
            nums[count] = nums[i]
            count += 1
        }
    }
    return count
};
// @lc code=end

