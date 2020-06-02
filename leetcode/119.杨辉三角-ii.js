/*
 * @lc app=leetcode.cn id=119 lang=javascript
 *
 * [119] 杨辉三角 II
 */

// @lc code=start
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    if(rowIndex === 0) return [1]
    const row = []
    const lastRow = [0].concat(getRow(rowIndex - 1), 0)
    for(let i = 1; i < lastRow.length; i++) {
        row.push(lastRow[i - 1] + lastRow[i])
    }
    // console.log(rowIndex, row, lastRow)
    return row
};
// @lc code=end

