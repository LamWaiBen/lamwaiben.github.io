/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const dp = Array(s.length).fill(0).map(v => Array(s.length).fill(false))
    // if(s[i] === s[j])
    // dp[i][j] = Math.max(1 + dp[i - 1][j + 1], dp[i][j])
    let res = '';
    for(let l = 0; l < s.length; l++) {
        for(let i = 0; i + l < s.length; i++) {
            let j = i + l
            if(l === 0) {
                dp[i][j] = true
            } else if(l === 1) {
                dp[i][j] = s[i] === s[j]
            } else {
                dp[i][j] = (s[i] === s[j] && dp[i + 1][j - 1])
            }
            if(dp[i][j] && l + 1 > res.length) {
                res = s.substr(i, l + 1)
            }
        }
    }
    return res
};
// @lc code=end