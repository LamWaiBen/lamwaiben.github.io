/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    // 双指针
    let i = m - 1
    let j = n - 1
    let k = m + n - 1

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--]
        } else {
            nums1[k--] = nums2[j--]
        }
    }

    while (j >= 0) {
        nums1[k--] = nums2[j--]
    }

    // 笨方法
    // let j = 0;
    // for (let i = 0; i < nums1.length; i++) {
    //     if(nums1[i] > nums2[j]) {
    //         for(let p = nums1.length - 1; p >= i; p--) {
    //             nums1[p] = nums1[p - 1]
    //         }
    //         nums1[i] = nums2[j++]
    //     }
    // }

    // for(let i = m + j; i < nums1.length; i++) {
    //     nums1[i] = nums2[j++]
    // }
};
// @lc code=end

