/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let s = 0;
    while (x) {
        let c = x % 10
        s = s * 10 + c
        x = ~~(x/10)
    }
    if(s > 2**31 - 1 || s < -(2 ** 31)) return 0
    return s
};
// @lc code=end
