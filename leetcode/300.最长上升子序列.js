/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if(!nums.length) return 0

    // O(nlog n)
    const dp = [nums[0]]
    const len = nums.length
    let u, v, c
    for (let i = 0; i < len; i++) {
        if (nums[i] > dp[dp.length - 1]) {
            // 如果大于dp数组的末尾, 满足上升条件放进数组
            dp.push(nums[i])
        } else {
            // [0, 9, 10, 5, 6, 7] :  [0, 9, 10] => [0, 5, 10] => [0, 5, 6] => [0, 5, 6, 7]
            // 如果存在比末尾元素小的新元素, 则可以把新元素替换到dp数组中, 使dp数组的末尾元素更小
            u = 0
            v = dp.length - 1
            while (u < v) {
                c = ((u + v) / 2) | 0
                if (nums[i] > dp[c]) {
                    u = c + 1
                } else {
                    v = c
                }
            }
            if (nums[i] < dp[u]) {
                console.log(nums[i], dp[u], u)
                dp[u] = nums[i]
            }
        }
    }
    return dp.length

    // O(n2)
    // const dp = Array(nums.length).fill(1)
    // let maxLength = 1

    // for(let i = 0; i < nums.length; i++) {
    //     for(let j = 0; j < i; j++) {
    //         if(nums[j] < nums[i]) {
    //             dp[i] = Math.max(dp[i], dp[j] + 1)
    //             maxLength = Math.max(dp[i], maxLength)
    //         }
    //     }
    // }
    // return maxLength
};
// @lc code=end

