/*
 * @lc app=leetcode id=58 lang=javascript
 *
 * [58] Length of Last Word
 *
 * https://leetcode.com/problems/length-of-last-word/description/
 *
 * algorithms
 * Easy (32.20%)
 * Total Accepted:    254.5K
 * Total Submissions: 790.4K
 * Testcase Example:  '"Hello World"'
 *
 * Given a string s consists of upper/lower-case alphabets and empty space
 * characters ' ', return the length of last word in the string.
 * 
 * If the last word does not exist, return 0.
 * 
 * Note: A word is defined as a character sequence consists of non-space
 * characters only.
 * 
 * Example:
 * 
 * Input: "Hello World"
 * Output: 5
 * 
 * 
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    // let length = 0
    // for(let i = s.length - 1; i >= 0; i--){
    //     if(s[i] != " "){
    //         length += 1
    //     }else if(length > 0){
    //         return length
    //     }
    // }
    // return length


    // other solution:  use trim()
    s = s.trim()
    let length = 0
    for(let i = s.length - 1; i >= 0; i--){
        if(s[i] != " "){
            length += 1
        }else{
            return length
        }
    }
    return length
};

