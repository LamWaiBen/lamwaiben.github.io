/*
 * @lc app=leetcode id=171 lang=javascript
 *
 * [171] Excel Sheet Column Number
 */
/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
    let num = 0
    let dig = 26
    let init = 64
    for(let i = s.length - 1; i > -1; i--){
        let n = s[i].charCodeAt() - init
        num += n * Math.pow(dig, s.length - 1 - i)
    }

    return num
};

