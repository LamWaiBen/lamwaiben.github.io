/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // let str = String(x)
    // for(let i = 0; i < str.length; i++) {
    //     if(str[i] != str[str.length - i - 1]) return false
    // }
    // return true

    // 不转字符串
    if(x < 0) return false
    if(x < 10) return true
    let left = 0, right = 1, num = x;

    while (num >= 1) {
        num /= 10
        left += 1
    }

    function getPosNum(pos){
        return ~~(x % (10 ** pos) / (10 ** (pos - 1)))
    }

    while (left > right) {
        if (getPosNum(left) != getPosNum(right)) return false
        left--
        right++
    }
    return true
};
// @lc code=end

