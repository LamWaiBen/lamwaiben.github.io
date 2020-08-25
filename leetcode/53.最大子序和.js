/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if(!nums.length) return 0
    // const dp = Array(nums.length + 1).fill(0)
    // dp[0] = Number.MIN_SAFE_INTEGER
    // for(let i = 0; i < nums.length; i++) {
    //     dp[i + 1] = Math.max(nums[i], dp[i] + nums[i])
    // }
    // return dp.reduce((pre, next) => Math.max(pre, next))


    // 无dp数组
    // let dp_0 = nums[0]
    // let dp_1 = 0, res = dp_0
    // for (let i = 1; i < nums.length; i++) {
    //     dp_1 = Math.max(nums[i], dp_0 + nums[i])
    //     dp_0 = dp_1
    //     res = Math.max(res, dp_1)
    // }
    // return res

    let prev = 0, maxNum = nums[0];
    for(let v of nums) {
        prev = Math.max(v, prev + v)
        maxNum = Math.max(maxNum, prev);
    }
    return maxNum
};
// @lc code=end

