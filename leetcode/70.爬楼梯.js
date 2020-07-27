/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // const dp = Array(n).fill(0)
    // dp[0] = 1
    // dp[1] = 2
    // for(let i = 2; i < n; i++) {
    //     dp[i] = dp[i - 1] + dp[i - 2]
    // }
    // return dp[n - 1]
    
    if(n < 3) return n
    p = 1
    q = 2
    let t = 0
    for(let i = 2; i < n; i++) {
        t = p + q
        p = q
        q = t
    }
    return t
};
// @lc code=end

