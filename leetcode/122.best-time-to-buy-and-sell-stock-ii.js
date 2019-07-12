/*
 * @lc app=leetcode id=122 lang=javascript
 *
 * [122] Best Time to Buy and Sell Stock II
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let profit = 0
    // for(let i = 0; i < prices.length; i++){
    //     if(prices[i] < prices[i + 1]){
    //         profit += prices[i + 1] - prices[i]
    //     }
    // }
    // return profit

    // top solution
    if(prices.length === 0) return 0
    prices.reduce((a, b) =>{
        if(a < b){
            profit += b - a
        }
        return b
    })
    return profit
};

