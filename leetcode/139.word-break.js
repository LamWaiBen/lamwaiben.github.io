/*
 * @lc app=leetcode id=139 lang=javascript
 *
 * [139] Word Break
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    let dp = Array(s.length + 1).fill(false)
    dp[0] = true
    for(let i = 1; i <= s.length; i++){
        for(let str of wordDict){
            if(dp[i - str.length]){
                if(s.substring(i - str.length, i) == str) {
                    dp[i] = true
                }
            }
        }
    }
    return dp[s.length]
};
// @lc code=end

