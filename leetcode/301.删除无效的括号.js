/*
 * @lc app=leetcode.cn id=301 lang=javascript
 *
 * [301] 删除无效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */

var removeInvalidParentheses = function (s) {
    const res = []
    const queue = []

    queue.push([s, 0])

    while (queue.length) {
        s = queue.shift()
        if (isVaildParenthese(s[0])) {
            res.push(s[0])
        } else if (res.length === 0) {
            let removeIndex = s[1]
            s = s[0]
            for (; removeIndex < s.length; removeIndex++) {
                if(
                    //保证是连续括号的第一个
                    (s[removeIndex] === '(' || s[removeIndex] === ')') &&
                    (removeIndex === 0 || s[removeIndex - 1] != s[removeIndex])
                ) {
                    //此时删除位置的下标 removei 就是下次删除位置的开始
                    let nextS = s.substring(0, removeIndex) + s.substring(removeIndex + 1)
                    queue.push([nextS, removeIndex])

                }
            }
        }
        
    }

    return res
};

function isVaildParenthese(str) {
    let count = 0
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            count++
        } else if (str[i] === ')') {
            count--
        }
        if (count < 0) return false
    }

    return count === 0
}
// @lc code=end