/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原IP地址
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    const result = []
    function backtrack(res, p, tmpArr, s) {
        if (p > s.length || tmpArr.length > 4) return
        if(p === s.length && tmpArr.length === 4) {
            res.push(tmpArr.join('.'))
        }

        for(let i = 1; i < 4; i++) {
            let str = s.slice(p, p + i)
            // 排除不合理的数据
            if(str > 255) continue
            if(i > 1 && str[0] == 0) continue
            tmpArr.push(str)
            backtrack(res, p + i, tmpArr, s)
            tmpArr.pop()
        }

    }

    backtrack(result, 0, [], s)
    return result
};
// @lc code=end

// console.log(restoreIpAddresses("25525511135")) // ["255.255.11.135","255.255.111.35"]
// console.log(restoreIpAddresses("010010")) // ["0.10.0.10","0.100.1.0"]

