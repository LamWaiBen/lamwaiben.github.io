/*
 * @lc app=leetcode.cn id=221 lang=javascript
 *
 * [221] 最大正方形
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    // 动态规划求出最大边长
    if (matrix.length === 0) return 0
    let rows = matrix.length
    let cols = matrix[0].length
    let dp = Array(rows + 1).fill(0).map(v => Array(cols + 1).fill(0))
    let result = 0
    for (let i = 1; i < rows + 1; i++) {
        for (let j = 1; j < cols + 1; j++) {
            if(matrix[i - 1][j - 1] == '0') continue;
            // 取左边和上边的最小边长 和 左上当前的边长, 他们的最小值, 作为当前的边长 + 1
            dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])

            result = Math.max(result, dp[i][j])
        }
    }
    return result * result
};
// @lc code=end