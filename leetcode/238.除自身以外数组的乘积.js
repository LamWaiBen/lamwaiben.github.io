/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const leftMulti = Array(nums.length).fill(1)
    const rightMulti = Array(nums.length).fill(1)

    for (let i = 0; i < nums.length - 1; i++) {
        leftMulti[i + 1] = nums[i] * leftMulti[i];
    }
    
    for (let i = nums.length- 1; i > 0; i--) {
        rightMulti[i - 1] = nums[i] * rightMulti[i];
    }

    return nums.map((v, i) => leftMulti[i] * rightMulti[i]);

};
// @lc code=end

