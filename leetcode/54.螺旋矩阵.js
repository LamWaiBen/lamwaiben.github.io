/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if(matrix.length === 0) return []
    const result = []
    let left = 0, top = 0, right = matrix[0].length - 1, bottom = matrix.length - 1;
    while (left <= right && top <= bottom) {
        for(let i = left; i <= right; i++) {
            result.push(matrix[top][i])
        }
        for(let i = top + 1; i <= bottom; i++) {
            result.push(matrix[i][right])
        }

        if(left < right && top < bottom) {
            for(let i = right - 1; i > left; i--) {
                result.push(matrix[bottom][i])
            }

            for(let i = bottom; i > top; i--) {
                result.push(matrix[i][left])
            }
        }
        left++
        right--
        top++
        bottom--
    }


    return result
};
// @lc code=end

// console.log(spiralOrder([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12]
// ])) //  [1,2,3,4,8,12,11,10,9,5,6,7]