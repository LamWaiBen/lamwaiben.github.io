/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (s.length < 2) return s.length

    // // 解法1: 借助hash表
    // let max = 0
    // let hash = {}
    // let sub = ""
    // for (let i = 0; i < s.length; i++) {
    //     if (hash[s[i]] !== undefined) {
    //         max = Math.max(sub.length, max)
    //         i = hash[s[i]] + 1
    //         sub = ""
    //         hash = {}
    //     }
    //     sub += s[i]
    //     hash[s[i]] = i
    // }
    // return Math.max(sub.length, max)

    // 双指针
    let max = 1
    let record = 0
    for(let i = 0; i < s.length; i++) {
        let index = s.indexOf(s[i], record)
        if(index < i) {
            record = index + 1
        }
        max = Math.max(max, i - record + 1)
    }

    return max
};
// @lc code=end

