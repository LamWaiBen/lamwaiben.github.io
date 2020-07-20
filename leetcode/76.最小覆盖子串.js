/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    // 滑动窗口
    const map = {}
    let minLen = Infinity
    let resL = s.length
    let missingType = 0
    for (let i = 0; i < t.length; i++) {
        let num = map[t[i]]
        if (!num) {
            num = 0
            missingType += 1
        }
        map[t[i]] = ++num
    }
    let left = 0, right = 0;

    while (right < s.length) {
        // c: 移入窗口的字符
        let c = s[right]
        // 窗口右移
        // logic 
        if (map[c] !== undefined) {
            map[c] -= 1
        }
        if (map[c] === 0) {
            missingType -= 1
        }
        while (missingType === 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1
                resL = left
            }
            // d: 移除窗口的字符
            let d = s[left];
            // 窗口右移
            // logic
            if (map[d] !== undefined) {
                map[d]++
            }
            if(map[d] > 0) {
                missingType += 1
            }
            
            left++
        }
        right++
    }

    return s.substring(resL, resL + minLen)
};
// @lc code=end

// console.log(minWindow('a', 'aa'))
// console.log(minWindow('ab', 'a'))
// console.log(minWindow('ab', 'A'))