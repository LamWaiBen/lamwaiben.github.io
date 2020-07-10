/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const hash = {}
    for(let i = 0; i < nums.length; i++) {
        if(hash[target - nums[i]] != undefined) {
            return [hash[target - nums[i]], i];
        } else {
            hash[nums[i]] = i;
        }
    }
};
// @lc code=end