/*
 * @lc app=leetcode id=125 lang=javascript
 *
 * [125] Valid Palindrome
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let str = s.replace(/\W/g, "").toLocaleLowerCase()
    // 二分
    // let mid = parseInt(str.length / 2)
    // for (let i = 0; i < mid; i++){
    //     if(str[i] != str[str.length - 1 - i]) return false
    // }
    // return true


    // top solution
    let r_str = str.split("").reverse().join()
    return str === r_str
};

