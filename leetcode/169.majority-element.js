/*
 * @lc app=leetcode id=169 lang=javascript
 *
 * [169] Majority Element
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let hash = {}
    for(let v of nums){
        hash[v] = hash[v] + 1 || 1
        if(hash[v] > (nums.length / 2)) return v
    }
};
