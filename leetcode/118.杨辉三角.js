/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    let res = []
    if (numRows >= 1) res.push([1])
    for(let i = 1; i < numRows; i++) {
        res.push(generateNextRow(res[i - 1]))
    }
    return res
};

function generateNextRow(row) {
    const arr = [0].concat(row, 0)
    const res = []
    for (let i = 1; i < arr.length; i++) {
        res.push(arr[i - 1] + arr[i])
    }
    return res
}
// @lc code=end

