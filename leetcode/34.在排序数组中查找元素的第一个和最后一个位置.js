/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let begin = 0,
      end = nums.length,
      left = -1,
      right = -1;
    let mid = 0
    // while (begin < end) {
    //     mid = parseInt((begin + end) / 2)
    //     if(nums[mid] === target)  break
    //     else if(nums[mid] > target) end = mid
    //     else if(nums[mid] < target) begin = mid + 1
    // }
    // if(nums[mid] === target) {
    //     left = mid
    //     right = mid
    //     while (nums[left - 1] === target) {left--}
    //     while (nums[right + 1] === target) {right++}
    // }
    // return [left, right];

    // 先找左边界
    while (begin < end) {
        mid = parseInt((begin + end) / 2)
        if(nums[mid] === target) {
            end = mid
        } else if(nums[mid] > target) {
            end = mid
        } else if(nums[mid] < target) {
            begin = mid + 1
        }
    }
    
    if(nums[begin] === target) left = begin;

    begin = 0
    end = nums.length
    while (begin < end) {
        mid = parseInt((begin + end) / 2);
        if (nums[mid] === target) {
        begin = mid + 1;
        } else if (nums[mid] > target) {
        end = mid;
        } else if (nums[mid] < target) {
        begin = mid + 1;
        }
    }

    if (nums[end - 1] === target) right = end - 1;

    return [left, right]
};
// @lc code=end

