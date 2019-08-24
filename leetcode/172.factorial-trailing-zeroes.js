/*
 * @lc app=leetcode id=172 lang=javascript
 *
 * [172] Factorial Trailing Zeroes
 */
/**
 * @param {number} n
 * @return {number}
 */

 // 因式分解出2和5, 计算2 和5 出现的次数, 又因为由于5比2大, 所以阶乘的时候5出现的次数肯定最少, 所以计算5出现的次数即可
 // 如何可以快速计算出 5 出现的次数?
 // 可以借组 5的次方来计算,达到节约时间 5 25 225  1125 ....
 // 另外可以借助 阶乘的特性(递增/递减) 可以从小算起
var trailingZeroes = function(n) {
    let zeroNum = 0
    for(let i = 5; i <= n; i *= 5){
        zeroNum += Math.floor(n / i)
        // n: 30,   zeroNum 6 1
    }
    return zeroNum
};

