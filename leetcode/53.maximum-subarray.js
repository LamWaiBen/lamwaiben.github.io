/*
 * @lc app=leetcode id=53 lang=javascript
 *
 * [53] Maximum Subarray
 *
 * https://leetcode.com/problems/maximum-subarray/description/
 *
 * algorithms
 * Easy (43.07%)
 * Total Accepted:    490K
 * Total Submissions: 1.1M
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * Given an integer array nums, find the contiguous subarray (containing at
 * least one number) which has the largest sum and return its sum.
 * 
 * Example:
 * 
 * 
 * Input: [-2,1,-3,4,-1,2,1,-5,4],
 * Output: 6
 * Explanation: [4,-1,2,1] has the largest sum = 6.
 * 
 * 
 * Follow up:
 * 
 * If you have figured out the O(n) solution, try coding another solution using
 * the divide and conquer approach, which is more subtle.
 * 
 */
/**
 * @param {number[]} nums
 * @return {number}
 */

 // 解题思路:
 // 连续子序列  最大值   可以判断可以使用动态规划解题
 // 寻找状态转移方程   f(n) = max(f(n - 1) + n  , f(n))
var maxSubArray = function(nums) {
    let maxSum = nums[0]
    let curSum = nums[0]
    for(let i = 1; i < nums.length; i++){
        curSum = Math.max(curSum + nums[i], nums[i])
        maxSum = Math.max(maxSum, curSum)
    }

    return maxSum
};

