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
    const dp = Array(s.length).fill(0)
    let maxLength = 0
    for(let i = 1; i < s.length; i++) {
      if(s[i] === ')') {
          if (s[i - 1] === '(') {
                dp[i] = (dp[i - 2] || 0) + 2
                maxLength = Math.max(maxLength, dp[i])
            } else if(s[i - 1] === ')') {
                // 前一个也是右括号, 则需要判断是否为两个闭合括号
                if(s[i - dp[i - 1] - 1] === '(') {
                    dp[i] = dp[i - 1] + 2

                    if (i - dp[i - 1] - 2 > 0) {
                        dp[i] = dp[i] + dp[i - dp[i - 1] - 2]
                    }
                    maxLength = Math.max(maxLength, dp[i])
                }
            }
        }
    }
    return maxLength
};
// @lc code=end