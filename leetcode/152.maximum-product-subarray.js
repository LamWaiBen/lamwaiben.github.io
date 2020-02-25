/*
 * @lc app=leetcode id=152 lang=javascript
 *
 * [152] Maximum Product Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    let max = -Infinity, imax = 1, imin = 1;      // 分别保存最大值和最小值, 因为在连续的元素中存在负数可以使 最小值也有可能翻身变为最大值
    for (let i = 0; i < nums.length; i++) {
        if(nums[i] < 0) {
            let tmp = imin
            imin = imax
            imax = tmp
        }
        imax = Math.max(imax * nums[i], nums[i])
        imin = Math.min(imin * nums[i], nums[i])
        max = Math.max(max, imax)
    }
    return max
};
// @lc code=end

