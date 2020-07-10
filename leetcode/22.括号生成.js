/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    // 回溯: 回溯是在暴力解法的基础上加入剪枝操作
    function backtrack(l, r, count, s){
        if(r > l) return // 当右括号数多于左括号数时, 剪枝
        if(l > n || r > n) return

        if(l === n && r === n) {
            result.push(s)
            return
        }
        if (s.length === count * 2) {
            backtrack(l + 1, r, count, s + "(");
        } else {
            backtrack(l, r + 1, count + 1, s + ")");
            backtrack(l + 1, r, count, s + "(");
        }
    }
    const result = []
    backtrack(1, 0, 0, '(')
    return result
};

// @lc code=end