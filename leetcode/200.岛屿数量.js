/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let result = 0
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if (walk(grid, i, j)) {
                result += 1
            }
        }
    }
    return result
};

function walk(grid, i, j) {
    if(i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) return false
    if(grid[i][j] === "1") {
        grid[i][j] = "0"
        walk(grid, i - 1, j)
        walk(grid, i + 1, j)
        walk(grid, i, j - 1)
        walk(grid, i, j + 1)
        return true
    } else {
        return false
    }

}
// @lc code=end

// console.log(numIslands([["1","1","1"],["0","1","0"],["1","1","1"]])) // 1