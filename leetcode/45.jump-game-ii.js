/*
 * @lc app=leetcode id=45 lang=javascript
 *
 * [45] Jump Game II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    // 动态规划
    // 问最少跳多少次?
    // 状态: 现在在哪格,  p
    // 选择: 范围内选择跳到哪里?    遍历范围内的可能性, 取最小值
    // dp(nums, 0) = Math.min(dp(nums, 1), ...., dp(nums, nums[0])) + 1
    // 时间复杂度是 递归深度 × 每次递归需要的时间复杂度，即 O(N^2)
    // let memo = Array(nums.length).fill(nums.length)
    // return dp(nums, 0)
    // function dp(nums, p) {
    //     if(nums.length - 1 <= p) return 0
    //     if (memo[p] != nums.length) return memo[p]
    //     for(let i = 1; i <= nums[p]; i++) {
    //         memo[p] = Math.min(memo[p], dp(nums, p + i) + 1)
    //     }
    //     return memo[p]
    // }


    // 贪心
    let n = nums.length
    let end = 0, farthest = 0;
    let jumps = 0;

    for(let i = 0; i < n - 1; i++) {
        farthest = Math.max(nums[i] + i, farthest)

        // i 和 end 标记了可以选择的跳跃步数
        // farthest标记了 [i...end] 之间可以跳到的最远距离
        if(end == i) {  // 当跳完当前所有的距离以后, 把end设为最远距离, 再继续重复
            jumps++
            end = farthest
        }
    }

    return jumps
};
// @lc code=end

