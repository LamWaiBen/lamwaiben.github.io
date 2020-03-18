/*
 * @lc app=leetcode id=55 lang=javascript
 *
 * [55] Jump Game
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let p = 0
    for (let i = 0; i < nums.length - 1; i++) {
        p = Math.max(p, i + nums[i])
        if(p <= i) return false
    }
    return p >= nums.length - 1
};
// @lc code=end

