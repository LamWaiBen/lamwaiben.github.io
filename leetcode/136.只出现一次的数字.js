/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    // 位运算
    return nums.reduce((prev, next) => {
        return prev ^ next   
    })

    // hash
    // const hashMap = new Map()
    // for(let v of nums) {
    //     if(hashMap.has(v)) {
    //         hashMap.delete(v)
    //     } else {
    //         hashMap.set(v, null)
    //     }
    // }
    // return [...hashMap.keys()][0]
};
// @lc code=end

