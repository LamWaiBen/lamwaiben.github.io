/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    // let max = 0
    // let dp = Array(nums.length).fill(0)
    // for (let i = 0; i < nums.length; i++) {
    //     let agoDP = 0
    //     for(let j = i - 2; j >= 0; j--){
    //         if (dp[j] > agoDP) {
    //             agoDP = dp[j]
    //         }
    //     }
    //     dp[i] = agoDP + nums[i]
    //     max = Math.max(dp[i], max)
    // }
    // return max

    //时间复杂度优化为 On
    if (nums.length === 0) return 0
    if (nums.length === 1) return nums[0]
    let dp = Array(nums.length).fill(0)
    dp[0] = nums[0]
    dp[1] = Math.max(dp[0], nums[1])
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i])
    }
    return dp[nums.length - 1]
};
// @lc code=end

