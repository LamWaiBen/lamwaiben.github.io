/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // 分治
    const m = nums1.length, n = nums2.length
    if(m > n) {
        return findMedianSortedArrays(nums2, nums1)
    }

    let iMin = 0, iMax = m;
    while (iMin <= iMax) {
        const i = parseInt((iMin + iMax) / 2)
        const j = parseInt((m + n + 1) / 2) - i;

        if(j != 0 && i != m && nums2[j - 1] > nums1[i]) {
            // i还没超过中位数, 需要增大
            iMin = i + 1;            
        } else if(i != 0 && j != n && nums1[i - 1] > nums2[j]) {
            // i超过中位数, 需要减少
            iMax = i - 1;
        } else {
            // i已达到要求
            let maxLeft = 0
            if(i === 0) {
                maxLeft = nums2[j - 1]
            } else if(j === 0) {
                maxLeft = nums1[i - 1]
            } else {
                maxLeft = Math.max(nums1[i - 1], nums2[j - 1])
            }
            if((m + n) % 2 === 1) return maxLeft

            let minRight = 0
            if(i === m) {
                minRight = nums2[j]
            } else if(j === n) {
                minRight = nums1[i]
            } else {
                minRight = Math.min(nums1[i], nums2[j])
            }
            
            return (maxLeft + minRight) / 2
        }
    }
    return 0
};
// @lc code=end