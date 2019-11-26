/*
 * @lc app=leetcode id=64 lang=javascript
 *
 * [64] Minimum Path Sum
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    // dp[i][j] = min(dp[i][j - 1], dp[i - 1][j]) + grod[i-1][j-1]
    // 由于是求最小值, 所以当超出边界时, 需要返回Infinity

    let n = grid.length
    let m = grid[0].length
    if(n == 1 && m == 1) return grid[0][0]

    let dp = Array(n + 1).fill(0).map(v => Array(m + 1).fill(0))
    
    let reduc = function(r, c) {
        if (r == n && c == m) return grid[r - 1][c - 1]
        if (r > n || c > m) return Infinity
        if (dp[r][c]) return dp[r][c]
        dp[r][c] = Math.min(reduc(r + 1, c) , reduc(r, c + 1)) + grid[r - 1][c - 1]
        return dp[r][c]
    }
    return reduc(1, 1)
};
// @lc code=end

