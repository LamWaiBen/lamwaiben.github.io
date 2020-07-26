/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 *
 * https://leetcode-cn.com/problems/minimum-path-sum/description/
 *
 * algorithms
 * Medium (65.97%)
 * Likes:    596
 * Dislikes: 0
 * Total Accepted:    127.9K
 * Total Submissions: 189.8K
 * Testcase Example:  '[[1,3,1],[1,5,1],[4,2,1]]'
 *
 * 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 
 * 说明：每次只能向下或者向右移动一步。
 * 
 * 示例:
 * 
 * 输入:
 * [
 * [1,3,1],
 * ⁠ [1,5,1],
 * ⁠ [4,2,1]
 * ]
 * 输出: 7
 * 解释: 因为路径 1→3→1→1→1 的总和最小。
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array(m + 1).fill(0).map(v => Array(n + 1).fill(0))

    function recursive(x, y) {
        if(dp[x][y]) return dp[x][y]
        if(x >= m || y >= n) return -1

        let c = recursive(x + 1, y)
        let r = recursive(x, y + 1)
        let next = (c >= 0 && r >= 0) ? Math.min(c, r) : Math.max(c, r, 0)

        dp[x][y] = next + grid[x][y]
        

        return dp[x][y]
    }

    recursive(0, 0)
    // console.log(dp)
    return dp[0][0]
};
// @lc code=end
// minPathSum([[1,3,1],[1,5,1],[4,2,1]])
