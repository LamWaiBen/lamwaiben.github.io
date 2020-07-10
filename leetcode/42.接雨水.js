/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    // 3. 单调递减栈
    // 当遇到右边的柱子的时候, 可以计算当前的阶段的雨水量
    let sum = 0
    const stack = []
    for(let i = 0; i < height.length; i++) {
        while (stack.length && height[stack[stack.length - 1]] < height[i]) {
            const curIndex = stack.pop()
            if(!stack.length) break
            const leftIndex = stack[stack.length - 1]
            const rightIndex = i
            const h = Math.min(height[leftIndex], height[rightIndex]) - height[curIndex]
            sum += (rightIndex - leftIndex - 1) * h
        }
        stack.push(i)
    }
    return sum


    // 2. 动态规划, 缓存每个点的最高高度
    // let sum = 0
    // let leftMaxs = [height[0]]
    // for(let i = 1; i < height.length; i++) {
    //     leftMaxs[i] = Math.max(height[i], leftMaxs[i - 1])
    // }

    // let rightMaxs = []
    // rightMaxs[height.length - 1] = height[height.length - 1]
    // for(let i = height.length - 2; i >= 0; i--) {
    //     rightMaxs[i] = Math.max(height[i], rightMaxs[i + 1])
    // }

    // for(let i = 1; i < height.length - 1; i++) {
    //     sum += Math.min(leftMaxs[i], rightMaxs[i]) - height[i]
    // }
    // return sum

    // 1. 暴力解法
    // let sum = 0
    // if(height.length === 0) return 0
    // for(let i = 1; i < height.length - 1; i++) {
    //     let maxLeft = 0, maxRight = 0;
    //     for(let j = i; j >= 0; j--) {
    //         maxLeft = Math.max(maxLeft, height[j])
    //     }
    //     for(let j = i; j < height.length; j++) {
    //         maxRight = Math.max(maxRight, height[j])
    //     }

    //     sum += Math.min(maxLeft, maxRight) - height[i]
    // }

    // return sum
};
// @lc code=end


// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
//               [   1,    3,          7,       10    ]
// 6