/*
 * @lc app=leetcode id=121 lang=javascript
 *
 * [121] Best Time to Buy and Sell Stock
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // 最大利润 动态规划
    let max = 0
    let min = Number.MAX_SAFE_INTEGER
    for(let i = 0; i< prices; i++){
        min = Math.min(min, prices[i])
        max = Math.max(max, prices[i] - min)
    }

    return max
};

