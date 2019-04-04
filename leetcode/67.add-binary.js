/*
 * @lc app=leetcode id=67 lang=javascript
 *
 * [67] Add Binary
 *
 * https://leetcode.com/problems/add-binary/description/
 *
 * algorithms
 * Easy (38.39%)
 * Total Accepted:    286.8K
 * Total Submissions: 746.7K
 * Testcase Example:  '"11"\n"1"'
 *
 * Given two binary strings, return their sum (also a binary string).
 * 
 * The input strings are both non-empty and contains only characters 1 or 0.
 * 
 * Example 1:
 * 
 * 
 * Input: a = "11", b = "1"
 * Output: "100"
 * 
 * Example 2:
 * 
 * 
 * Input: a = "1010", b = "1011"
 * Output: "10101"
 * 
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 * 
 * 思路: 加法思想,  同一位相加, 满2进一位....
 * 
 */
var addBinary = function(a, b) {
    let result = ""
    let ahead = 0
    let LEN_A = a.length - 1
    let LEN_B = b.length - 1
    while (LEN_A >= 0 || LEN_B >= 0 || ahead == 1) {
        ahead += LEN_A >= 0 ? a[LEN_A--] - 0 : 0
        ahead += LEN_B >= 0 ? b[LEN_B--] - 0 : 0
        result = (ahead % 2) + result

        ahead = parseInt(ahead / 2)
    }

    return result
};

