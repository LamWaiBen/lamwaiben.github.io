/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let max = 0
    let volumn = 0
    const leftMax = []
    const rightMax = []
    for(let i = 0; i < height.length; i++){
        leftMax[i] = max = Math.max(height[i], max)
    }
    max = 0
    for(let i = height.length - 1; i >= 0; i--) {
        rightMax[i] = max = Math.max(height[i], max)
    }

    for(let i = 0; i < height.length; i++) {
        volumn += Math.min(leftMax[i], rightMax[i]) - height[i]
        // console.log(volumn)
    }
    return volumn
};
// @lc code=end

