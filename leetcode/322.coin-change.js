/*
 * @lc app=leetcode id=322 lang=javascript
 *
 * [322] Coin Change
 */
/**
 * dp动态规划解法, 分析可能金额的最少硬币数, 
 * 只需要求出在达到目标金额前一个可能金额的最少硬币数,一直迭代至只用基础硬币即可
 * 假设目标金额是m, 要求的数量是dp[m], 当金额为0时, dp[0] = 0;
 * 那么假如我们知道dp[0] 到 dp[i - 1]的时候, 当我们要求dp[i]的时候, 
 * 这时候假设有一个x在硬币规格内的, 且dp[i-x]是最小硬币数, 那么这时 dp[i] = dp[i - x] + 1
 * 
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    if(coins.length === 0) return -1
    let dp = new Array(amount + 1).fill(amount + 1)
    dp[0] = 0
    coins.sort((a, b) => a - b)

    for (let i = 1; i <= amount; i++){
        for(let coin of coins){
            if(coin > i) break
            dp[i] = Math.min(dp[i], dp[i - coin] + 1)
        }
    }

    if (dp[amount] > amount) return -1
    return dp[amount]
};

