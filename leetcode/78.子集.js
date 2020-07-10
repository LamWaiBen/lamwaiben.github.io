/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    function backtrack(len, start, curr) {
        if (curr.length === len) {
            result.push([...curr])
        }

        for(let i = start; i < nums.length; i++) {
            if(curr.length >= len) return
            curr.push(nums[i])
            backtrack(len, i + 1, curr)
            curr.pop()
        }
    }
    const result = []
    // 子集的长度
    for(let i = 0 ; i <= nums.length; i++) {
        backtrack(i, 0, [])
    }
    return result
};
// @lc code=end