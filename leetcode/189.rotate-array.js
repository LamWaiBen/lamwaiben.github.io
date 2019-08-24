/*
 * @lc app=leetcode id=189 lang=javascript
 *
 * [189] Rotate Array
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    // method1
    // let len = nums.length
    // for(let i = 0; i < k; i++){
    //     nums.unshift(nums[nums.length - 1 - i])
    // }
    // nums.length = len

    // method2  best
    let len = nums.length
    nums.splice(0, 0, ...nums.splice(len - k))
    nums.length = len

    // method3  best
    // nums.unshift(...nums.splice(nums.length - k));
};

