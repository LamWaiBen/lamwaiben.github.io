/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
    // 单调递减栈
    // 当遇到元素比上一个元素大的时候, 则找到"下一个比他大的元素"
    const stack = [];
    const hashMap = {};
    for(let i = 0; i < nums2.length; i++) {
        const n = nums2[i]
        while (stack.length > 0 && stack[stack.length - 1] < n) {
            const cur = stack.pop()
            hashMap[cur] = n
        }
        stack.push(n)
    }
    return nums1.map(v => hashMap[v] || -1)
    
    // 暴力解法
    // return nums1.map(v => {
    //     let elIndex = -1
    //     for(let i = 0; i < nums2.length; i++) {
    //         if (nums2[i] === v) {
    //             elIndex = i
    //         }
    //         if(elIndex > -1 && nums2[i] > v) {
    //             return nums2[i]
    //         }
    //     }
    //     return -1
    // })
};
// @lc code=end