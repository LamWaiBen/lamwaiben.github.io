/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    // 1. backtrack + memo
    const map = new Map()
    function backtrack(i, j) {
        const key = `${i}-${j}`
        if (map.has(key)) return map.get(key)
        if (p.length === j && s.length === i) {
            map.set(key, true)
            return true
        }
        if(s.length < i) {
            map.set(key, false)
            return false
        }
        
        let ret
        if (p[j] === '.' || p[j] === s[i]) {
            if(p[j + 1] === '*') {
                ret = backtrack(i + 1, j) || backtrack(i, j + 2)
            } else {
                ret = backtrack(i + 1, j + 1)
            }
        } else if (p[j + 1] === '*') {
            ret = backtrack(i, j + 2)
        } else {
            ret = false
        }
        map.set(key, ret)
        return ret
    }

    backtrack(0, 0)

    return map.get(`0-0`)
};
// @lc code=end


console.log(isMatch('ab', '.*..')) // true
console.log(isMatch('aaa', 'aaaa')) // false

console.log(isMatch('bbbba', '.*a*a')) // true
console.log(isMatch('abcd', 'd*')) // false
console.log(isMatch('aaa', '.*')) // true
console.log(isMatch('aaa', 'ab*a*c*a')) // true
console.log(isMatch('ab', '.*c')) // false

console.log(isMatch('aa', 'a')) // false
console.log(isMatch('aa', 'a*')) // true
console.log(isMatch('ab', '.*')) // true
console.log(isMatch('aab', 'c*a*b')) // true
console.log(isMatch('mississippi', 'mis*is*p*.')) // false