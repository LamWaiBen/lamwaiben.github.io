/*
 * @lc app=leetcode id=38 lang=javascript
 *
 * [38] Count and Say
 *
 * https://leetcode.com/problems/count-and-say/description/
 *
 * algorithms
 * Easy (39.84%)
 * Total Accepted:    268K
 * Total Submissions: 672.1K
 * Testcase Example:  '1'
 *
 * The count-and-say sequence is the sequence of integers with the first five
 * terms as following:
 * 
 * 
 * 1.     1
 * 2.     11
 * 3.     21
 * 4.     1211
 * 5.     111221
 * 
 * 
 * 1 is read off as "one 1" or 11.
 * 11 is read off as "two 1s" or 21.
 * 21 is read off as "one 2, then one 1" or 1211.
 * 
 * Given an integer n where 1 ≤ n ≤ 30, generate the n^th term of the
 * count-and-say sequence.
 * 
 * Note: Each term of the sequence of integers will be represented as a
 * string.
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: 1
 * Output: "1"
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 4
 * Output: "1211"
 * 
 */
/**
 * @param {number} n
 * @return {string}
 */
// var countAndSay = function(n) {
//     if(n === 1) return "1"
//     let perCountAndSay = countAndSay(n - 1) // 111221
//     let str = ""
//     let count = 1
//     for (let i = 0; i < perCountAndSay.length; i++){
//         if (perCountAndSay[i] === perCountAndSay[i + 1]){
//             count += 1
//             continue
//         }
//         str += String(count) + perCountAndSay[i]
//         count = 1
//     }

//     return str
// };

// 递归版本
var countAndSay = function (n) {
    return getStr('1', n, 1)
};
function getStr(s, n, count) {

    let str = ''
    if (count === n) {
        return s
    }
    let len = 1
    for (let i = 0, length = s.length; i < length; i++) {
        if (i !== length - 1 && s[i] === s[i + 1]) {
            len++
        } else {
            str = str + len + s[i]
            len = 1
        }
    }
    s = str
    return getStr(s, n, ++count)
}

