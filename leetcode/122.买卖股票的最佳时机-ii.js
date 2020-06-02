/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
// var maxProfit = function (prices) {
//     const dp = Array(prices.length).fill(0)
//     for (let i = 0; i < prices.length - 1; i++) {
//         let min = prices[i]
//         let max = 0
//         for (let j = i + 1; j < prices.length; j++) {
//             if (min > prices[j]) {
//                 min = prices[j]
//             } else if (prices[j] - min > max) {
//                 max = dp[i] + prices[j] - min
//                 dp[j] = Math.max(dp[j], max)
//             }

//             dp[j] = Math.max(dp[j - 1], dp[j])
//         }
//     }
//     console.log(dp)
//     return dp[prices.length - 1]
// };

var maxProfit = function (prices) {
    // 贪心
    let profit = 0
    prices.reduce((a, b) => {
        if (b > a) profit += (b - a)
        return b
    })

    return profit
};
// @lc code=end

