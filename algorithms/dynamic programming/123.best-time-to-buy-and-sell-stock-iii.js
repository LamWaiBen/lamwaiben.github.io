/*
 * @lc app=leetcode id=123 lang=javascript
 *
 * [123] Best Time to Buy and Sell Stock III
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    /**
     * 思路:
     * 最多可以买卖两次
     * 第一次遍历, 求出在每一天卖出的最高利润
     * 第二次遍历, 求出两天叠加的利润
     */
    if (prices.length < 2) return 0
    let dp = Array(prices.length).fill(0)
    for(let t = 0; t < 2; t++){
        let min = prices[0]
        let max = 0
        for(let i = 1; i < prices.length; i++) {
            min = Math.min(min, prices[i] - dp[i])
            max = Math.max(max, prices[i] - min)
            dp[i] = max
        }
    }


    return dp[prices.length - 1]
};
// @lc code=end

