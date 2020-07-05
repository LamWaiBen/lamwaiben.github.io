/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    let start = 0
    let end = matrix.length - 1 - start;
    while (end > 0) {
        for(let i = 0; i < end - start; i++) {
            [
                matrix[start][start + i],                       // 上
                matrix[start + i][end],                         // 右
                matrix[end][matrix.length - 1 - (start + i)],   // 下
                matrix[matrix.length - 1 - (start + i)][start], // 左
            ] = [
                // 原来的位置
                matrix[matrix.length - 1 - (start + i)][start], // 左
                matrix[start][start + i],                       // 上
                matrix[start + i][end],                         // 右
                matrix[end][matrix.length - 1 - (start + i)],   // 下
            ];
        }
        start += 1;
        end = matrix.length - 1 - start;
    }
};
// @lc code=end
