/*
 * @lc app=leetcode.cn id=85 lang=javascript
 *
 * [85] 最大矩形
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    // 可以看做是84题柱状图的变型, 每一行的高度都来自于上一行
    if (!matrix.length || !matrix[0].length) return 0
    const col = matrix.length
    const row = matrix[0].length
    const heights = Array(row).fill(0)
    let max = 0
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            if (matrix[i][j] === '1') { // 高度来自于上一行 + 1
                heights[j] += 1;
            } else {
                heights[j] = 0;
            }
        }
        max = Math.max(max, largestRectangleArea(heights.slice()))
    }

    return max
};
var largestRectangleArea = function (heights) {
    if (!heights.length) return 0
    // 前后加入哨兵值, 使遍历到最后时,可以出栈, 最终计算面积
    heights.push(0)
    heights.unshift(0)
    let maxArea = 0
    const stack = []
    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
            const cur = stack.pop()
            const left = (stack[stack.length - 1] || 0)
            const right = i - 1
            maxArea = Math.max(maxArea, heights[cur] * (right - left))
        }
        stack.push(i)
    }
    return maxArea
};
// @lc code=end