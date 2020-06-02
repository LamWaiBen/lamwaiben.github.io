/*
 * @lc app=leetcode.cn id=389 lang=javascript
 *
 * [389] 找不同
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    let i = 0, j = 0;
    let code = 0;
    while (i < s.length) {
        code ^= s.charCodeAt(i++)
    }
    while (j < t.length) {
        code ^= t.charCodeAt(j++)
    }

    return String.fromCharCode(code)
};
// @lc code=end

