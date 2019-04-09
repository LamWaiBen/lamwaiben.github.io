/*
 * @lc app=leetcode id=69 lang=javascript
 *
 * [69] Sqrt(x)
 *
 * https://leetcode.com/problems/sqrtx/description/
 *
 * algorithms
 * Easy (30.95%)
 * Total Accepted:    347.6K
 * Total Submissions: 1.1M
 * Testcase Example:  '4'
 *
 * Implement int sqrt(int x).
 * 
 * Compute and return the square root of x, where x is guaranteed to be a
 * non-negative integer.
 * 
 * Since the return type is an integer, the decimal digits are truncated and
 * only the integer part of the result is returned.
 * 
 * Example 1:
 * 
 * 
 * Input: 4
 * Output: 2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 8
 * Output: 2
 * Explanation: The square root of 8 is 2.82842..., and since 
 * the decimal part is truncated, 2 is returned.
 * 
 * 
 */
/**
 * @param {number} x
 * @return {number}
 */
// 二分搜索
var mySqrt = function(x) {
    // let r = x;
    // while (r * r > x)
    //     r = ((r + x / r) / 2) | 0;
    // return r;
    
    if(x === 0) return 0
    let left = 1
    let right = x
    let res
    while ((left <= right)) {
        // let mid = left + parseInt((right - left) / 2)
        let mid = parseInt((left + right) / 2)
        if(mid * mid <= x){
            left = mid + 1
            res = mid
        }else{
            right = mid - 1
        }
    }
    return res

};
