/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    // 回溯
    function backtrack(list, tempList, nums){
        if (tempList.length === nums.length) return list.push([...tempList])

        for(let i = 0; i < nums.length; i++) {
            if (tempList.includes(nums[i])) continue;
            tempList.push(nums[i])
            backtrack(list, tempList, nums);
            tempList.pop()
        }
    }
    const result = []
    backtrack(result, [], nums)
    return result
};
// @lc code=end