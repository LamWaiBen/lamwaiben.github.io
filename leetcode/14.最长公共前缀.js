/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let res = strs[0] || ''
    return strs.reduce((prev, next) => {
        let i = 0;
        while (i < prev.length && i < next.length) {
            if(prev[i] != next[i]) break
            i++
        }
        return prev.substr(0, i)
    }, res)

};
// @lc code=end

