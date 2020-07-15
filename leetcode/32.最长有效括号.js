/*
 * @lc app=leetcode.cn id=32 lang=javascript
 *
 * [32] 最长有效括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if(!s || s.length < 2) return 0
    let maxLength = 0
    const dp = Array(s.length).fill(0)  // dp[i] = j ,(i表示当前的位置, j表示当前的长度)
    for(let i = 1; i < s.length; i++) {
        if(s[i] === ')') {
            if(s[i - 1] === '(') {
                dp[i] = 2 + (dp[i - 2] || 0)
            } else {
                // 处理 '()(())' 的情况  ()(()) => 6
                const prvIndex = i - 1 - dp[i - 1]
                if(s[prvIndex] === '(') {
                    dp[i] = dp[i - 1] + 2
                    if (prvIndex > 0) {
                        dp[i] += dp[prvIndex - 1]
                    }
                }
            }
            maxLength = Math.max(maxLength, dp[i])
        }
    }

    return maxLength
};
// @lc code=end