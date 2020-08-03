/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    return fib_tail(N, 0, 1)
};

function fib_tail(n, first, second){
    if (n === 0) return first
    if (n === 1) return second
    return fib_tail(n - 1, second, first + second)
}
// @lc code=end