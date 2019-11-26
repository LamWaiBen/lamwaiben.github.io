/*
 * @lc app=leetcode id=63 lang=javascript
 *
 * [63] Unique Paths II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    let n = obstacleGrid.length
    let m = obstacleGrid[0].length

    let dp = Array(n + 1).fill(0).map(v => Array(m + 1).fill(-1))

    // 递归
    let recur = function (r, c) {
        if (r > n || c > m) return 0;
        if (obstacleGrid[r - 1][c - 1]) return 0
        if (r == n && c == m) return 1;
        if (dp[r][c] > -1) return dp[r][c]
        dp[r][c] = recur(r + 1, c) + recur(r, c + 1)
        return Math.max(dp[r][c], 0)
    }
    return recur(1, 1)
};
// @lc code=end

