/*
 * @lc app=leetcode.cn id=84 lang=javascript
 *
 * [84] 柱状图中最大的矩形
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    if(!heights.length) return 0
    // 前后加入哨兵值, 使遍历到最后时,可以出栈, 最终计算面积
    heights.push(0)
    heights.unshift(0)
    let maxArea = 0
    const stack = []
    for(let i = 0; i < heights.length; i++) {
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