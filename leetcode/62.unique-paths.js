/*
 * @lc app=leetcode id=62 lang=javascript
 *
 * [62] Unique Paths
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    // dp[x][y] 表示起点到x, y坐标的有多少种路径
    // dp[1][1] = 1 
    // dp[x][y] = dp[x -1][y] + dp[x][y - 1]

    let dp = Array(n + 1).fill(0).map(v => Array(m + 1).fill(0))
    // 迭代
    // dp[0][1] = 1
    // for(let i = 1; i <= m; i++) {
    //     for(let j = 1; j <= n; j++) {
    //         dp[j][i] = dp[j - 1][i] + dp[j][i - 1]
    //     }
    // }
    // return dp[n][m]

    // 递归
    let recur = function (r, c) {
        if(r == n && c ==m) return 1;
        if(r > n || c > m) return 0;
        if(dp[r][c]) return dp[r][c]
        dp[r][c] = recur(r + 1, c) + recur(r, c + 1)
        return dp[r][c]
    }
    return recur(1,1)
};
// @lc code=end

