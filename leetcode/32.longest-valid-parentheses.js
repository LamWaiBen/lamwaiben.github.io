/*
 * @lc app=leetcode id=32 lang=javascript
 *
 * [32] Longest Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {

    let dp = Array(s.length + 1).fill(0)
    let max = 0
    for(let i = 1; i < s.length; i++){

        let current = i
        let previous = i - 1                        // 前一个字符
        let previousClosed = i - 2                  // 当前字符的前一个链子
        let chainBegion = i - dp[previous]          // 后一个链链的开始位置
        let betweenChains = chainBegion - 1         // 两个合法链之间不合法的字符
        let previousChainEnd = chainBegion - 2      // 前一个链的结束位置
        if(s[current] == ")"){
            if (s[previous] == "(") {
                dp[i] = current >= 2 ? dp[previousClosed] + 2 : 2
            } else if (s[betweenChains] == "(") {      // 找
                dp[i] = dp[previous] + (chainBegion >= 2 ? dp[previousChainEnd] + 2: 2)
            }
        }

        max = Math.max(dp[i], max)
    }
    return max

};
// @lc code=end
