/*
 * @lc app=leetcode id=35 lang=javascript
 *
 * [35] Search Insert Position
 *
 * https://leetcode.com/problems/search-insert-position/description/
 *
 * algorithms
 * Easy (40.57%)
 * Total Accepted:    375.5K
 * Total Submissions: 925.3K
 * Testcase Example:  '[1,3,5,6]\n5'
 *
 * Given a sorted array and a target value, return the index if the target is
 * found. If not, return the index where it would be if it were inserted in
 * order.
 * 
 * You may assume no duplicates in the array.
 * 
 * Example 1:
 * 
 * 
 * Input: [1,3,5,6], 5
 * Output: 2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [1,3,5,6], 2
 * Output: 1
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: [1,3,5,6], 7
 * Output: 4
 * 
 * 
 * Example 4:
 * 
 * 
 * Input: [1,3,5,6], 0
 * Output: 0
 * 
 * 
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {

    // 暴力循环
    // if (nums[0] >= target) return 0
    // if (nums[nums.length - 1] < target) return nums.length
    // if (nums[nums.length - 1] === target) return nums.length - 1

    // for (let i = 0; i < nums.length - 1; i++) {
    //     if (nums[i] < target && nums[i + 1] >= target) return i + 1
    // }


    // 二分
    // if (nums[0] >= target) return 0
    if (nums[nums.length - 1] < target) return nums.length
    if (nums[nums.length - 1] === target) return nums.length - 1

    let l = 0
    let r = nums.length - 1
    while (l < r) {
        let mid = parseInt((l + r) / 2)
        if (nums[mid] > target){
            r = mid 
        } else if (nums[mid] == target){
            return mid
        }else{
            l = mid + 1
        }
    }

    return l
};

