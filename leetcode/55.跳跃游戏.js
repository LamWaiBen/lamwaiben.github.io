/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    if(nums.length === 0) return false
    if(nums.length === 1) return true
    // 1. 记录当前能去到的最远的点
    // 2. 在能去的范围内找下一个最远的点
    let max = nums[0]
    let i = 1
    while (i < nums.length && i <= max) {
        if(nums[i] + i > max) {
            max = nums[i] + i
        }
        i++
    }

    return max >= nums.length - 1
};
// @lc code=end

