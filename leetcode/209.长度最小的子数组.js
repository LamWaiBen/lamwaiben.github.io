/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
    let result = Infinity
    let lIndex = 0
    let rIndex = 0
    let curS = 0

    while (rIndex < nums.length) {
        let rNum = nums[rIndex]
        curS += rNum
        while (curS - nums[lIndex] >= s) {
            curS -= nums[lIndex]
            lIndex++
        }
        if(curS >= s) {
            result = Math.min(result, rIndex - lIndex + 1)
        }
        rIndex++
    }

    return result === Infinity ? 0 : result
};
// @lc code=end

// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])) // 2
// console.log(minSubArrayLen(3, [1, 1])) // 0