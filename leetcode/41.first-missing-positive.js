/*
 * @lc app=leetcode id=41 lang=javascript
 *
 * [41] First Missing Positive
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    // 在原数组中排序, 使索引值与元素值一致
    for (let i = 0; i < nums.length; i++) {
        let val = nums[i]
        if (val > 0 && val <= nums.length && nums[val] != nums[i]) {
            [nums[i], nums[val]] = [nums[val], nums[i]]
            i--
        }
    }

    // 当出现索引值与元素值不一样的时候, 则成功找到非递增正数
    let t = 1
    for(let i = 1; i < nums.length; i++) {
        if (nums[i] != i) return i
        t += 1
    }
    return t
};
// @lc code=end

