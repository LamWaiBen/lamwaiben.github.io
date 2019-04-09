/*
 * @lc app=leetcode id=70 lang=javascript
 *
 * [70] Climbing Stairs
 *
 * https://leetcode.com/problems/climbing-stairs/description/
 *
 * algorithms
 * Easy (43.77%)
 * Total Accepted:    379.2K
 * Total Submissions: 865.3K
 * Testcase Example:  '2'
 *
 * You are climbing a stair case. It takes n steps to reach to the top.
 * 
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can
 * you climb to the top?
 * 
 * Note: Given n will be a positive integer.
 * 
 * Example 1:
 * 
 * 
 * Input: 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 * 
 * 
 */
/**
 * @param {number} n
 * @return {number}
 */
// 动态规划 dynamic programming  
var climbStairs = function(n) {
    // if(n === 0) return 0
    // if(n === 1) return 1
    // if(n === 2) return 2
    // if(n > 3){
    //     return climbStairs(n - 1, sum + climbStairs(n - 2))
    // }else{
    //     return n + sum
    // }

    // 可以使用数组优化
    let arr = [0, 1, 2]
    if(n < 3) return n
    for(let i = 3; i <= n; i++){
        arr[i] =  arr[i -1] + arr[i -2]
    }
    return arr[n]

};


