/*
 * @lc app=leetcode id=136 lang=javascript
 *
 * [136] Single Number
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    // hash
    let hash = {}
    for(let i = 0; i < nums.length; i++){
        if (!hash[nums[i]]) hash[nums[i]] = 0
        hash[nums[i]] += 1
    }
    for(let key in hash){
        if (hash[key] < 2) return Number(key)
    }
    return 0


    // 位操作
    return nums.reduce((a, b) => a^b)
};

