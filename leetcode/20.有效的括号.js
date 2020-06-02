/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const stack = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ')') {
            stack[stack.length - 1] === '(' ? stack.pop() : stack.push(s[i])
        } else if (s[i] === ']') {
            stack[stack.length - 1] === '[' ? stack.pop() : stack.push(s[i])
        } else if (s[i] === '}') {
            stack[stack.length - 1] === '{' ? stack.pop() : stack.push(s[i])
        } else {
            stack.push(s[i])
        }
    }
    return stack.length === 0
};
// @lc code=end

