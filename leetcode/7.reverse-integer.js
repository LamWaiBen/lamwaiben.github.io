/*
 * @lc app=leetcode id=7 lang=javascript
 *
 * [7] Reverse Integer
 *
 * https://leetcode.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (25.07%)
 * Total Accepted:    641K
 * Total Submissions: 2.5M
 * Testcase Example:  '123'
 *
 * Given a 32-bit signed integer, reverse digits of an integer.
 * 
 * Example 1:
 * 
 * 
 * Input: 123
 * Output: 321
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: -123
 * Output: -321
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: 120
 * Output: 21
 * 
 * 
 * Note:
 * Assume we are dealing with an environment which could only store integers
 * within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For the purpose
 * of this problem, assume that your function returns 0 when the reversed
 * integer overflows.
 * 
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let MAX = Math.pow(2, 31) - 1
    let MIN = Math.pow(-2, 31)

    if(x > MAX || x < MIN) return 0
    
    let sign = Math.sign(x)
    x = Math.abs(x)
    let target = 0

    while (x >= 10) {
        target *= 10
        target += (x % 10)
        x = parseInt(x / 10)
    }
    
    target *= 10
    target += x

    target *= sign
    if (target > MAX || target < MIN) return 0
    return target
    /* 
    √ 1032/1032 cases passed (80 ms)
    √ Your runtime beats 95.02 % of javascript submissions
    √ Your memory usage beats 60.09 % of javascript submissions (35.8 MB)
    
    */
};

