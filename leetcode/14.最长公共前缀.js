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
    // let res = strs[0] || ''
    // return strs.reduce((prev, next) => {
    //     let i = 0;
    //     while (i < prev.length && i < next.length) {
    //         if(prev[i] != next[i]) break
    //         i++
    //     }
    //     return prev.substr(0, i)
    // }, res)

    // 思路2: 字符串转成 ascii码直接比较, 去最大值与最小值的公共前缀
    if(strs.length === 0) return ''
    let maxStr = strs[0]
    let minStr = strs[0]
    for(let str of strs) {
        if(str > maxStr) {
            maxStr = str
        } else if(str < minStr) {
            minStr = str
        }
    }
    for(let i = 0; i < minStr.length; i++) {
        if(minStr[i] != maxStr[i]) {
            return minStr.slice(0, i)
        }
    }
    return ''
};
// @lc code=end

console.log(longestCommonPrefix(['abc', 'c', 'abce', 'aaa']))