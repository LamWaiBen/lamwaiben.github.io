/*
 * @lc app=leetcode id=28 lang=javascript
 *
 * [28] Implement strStr()
 *
 * https://leetcode.com/problems/implement-strstr/description/
 *
 * algorithms
 * Easy (31.49%)
 * Total Accepted:    398.4K
 * Total Submissions: 1.3M
 * Testcase Example:  '"hello"\n"ll"'
 *
 * Implement strStr().
 * 
 * Return the index of the first occurrence of needle in haystack, or -1 if
 * needle is not part of haystack.
 * 
 * Example 1:
 * 
 * 
 * Input: haystack = "hello", needle = "ll"
 * Output: 2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: haystack = "aaaaa", needle = "bba"
 * Output: -1
 * 
 * 
 * Clarification:
 * 
 * What should we return when needle is an empty string? This is a great
 * question to ask during an interview.
 * 
 * For the purpose of this problem, we will return 0 when needle is an empty
 * string. This is consistent to C's strstr() and Java's indexOf().
 * 
 */
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// var strStr = function(haystack, needle) {
//     // return haystack.indexOf(needle)

//     if(!needle) return 0
//     let len = needle.length
//     for(let i = 0; i < haystack.length; i++){
//         if(haystack.substring(i, len + i) === needle) return i
//     }
//     return -1

// };



// KMP
var strStr = function (haystack, needle) {
    var m = haystack.length, n = needle.length;
    if (!n) return 0;
    var lps = kmpProcess(needle);
    for (var i = 0, j = 0; i < m;) {
        if (haystack[i] == needle[j]) {
            i++ , j++;
        }
        if (j == n) return i - j;
        if (i < m && haystack[i] != needle[j]) {
            if (j) j = lps[j - 1];
            else i++;
        }

    }
    return -1;
};

var kmpProcess = function (needle) {
    var n = needle.length;
    var lps = new Array(n).fill(0);
    for (var i = 1, length = 0; i < n;) {
        if (needle[i] === needle[length]) {
            length++;
            lps[i] = length;
            i++;
        } else if (length) length = lps[length - 1];
        else {
            lps[i] = 0;
            i++;
        }
    }
    return lps;
}

