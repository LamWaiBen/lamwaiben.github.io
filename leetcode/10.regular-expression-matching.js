/*
 * @lc app=leetcode id=10 lang=javascript
 *
 * [10] Regular Expression Matching
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    // method1: 暴力递归
    // 对头部逐个判断, 
    // if(!p) return !s
    // let first = p[0] === s[0] || p[0] === "."
    // if(!s) first = false

    // if(p.length >= 2 && p[1] == "*"){
    //     return isMatch(s, p.substring(2)) || (first && isMatch(s.substring(1), p))
    // } else {
    //     return first && isMatch(s.substring(1), p.substring(1))
    // }


    // method2: 动态规划
    // step1: 确立状态 dp[i][j] s的前 i 个字符 被 p 的前 j 个字符匹配
    // step2: 转移方程分3种情况考虑
    //        1. p[j] === s[i]      ->  dp[i][j] = dp[i - 1][j - 1]
    //        2. p[j] === '.'       ->  dp[i][j] = dp[i - 1][j - 1]
    //        3. p[j] === '*'       ->  1. p[j - 1] !== s[i]  ->  dp[i][j] = dp[i][j - 2]
    //                                  2. p[j - 1] === s[i]  ->  这里又有可能会匹配(1, 多)个同字符
    //                                                            1. 只匹配一个,  dp[i][j] = dp[i][j - 1]
    //                                                            2. 匹配多个   dp[i][j] = dp[i - 1][j]
    
    // let dp = Array(s.length + 1).fill(0).map(v => Array(p.length + 1).fill(0))

    // // s的前0个字符能被p的前0个字符匹配
    // dp[0][0] = 1

    // // 考虑前面的带*号的pattern可以被忽略的情况
    // for(let j = 0; j < p.length; j++){
    //     if(p[j] == "*" && dp[0][j - 1]){
    //         dp[0][j + 1] = 1        // 表示在s 0个字符的时候 pattern a*b*c* 的匹配情况
    //     }
    // }

    // for(let i = 0; i < s.length; i++){
    //     for(let j = 0; j < p.length; j++){
    //         if (s[i] == p[j] || p[j] == ".") {
    
    //             dp[i + 1][j + 1] = dp[i][j]
    
    //         } else if(p[j] == "*") {
    //             if(p[j - 1] == s[i] || p[j - 1] == ".") {
                    
    //                 dp[i + 1][j + 1] = dp[i + 1][j] || dp[i][j + 1] || dp[i + 1][j - 1]
                    
    //             } else {
    //                 dp[i + 1][j + 1] = dp[i + 1][j - 1]
    //             }
    //         }
    //     }
    // }
    // return !!dp[s.length][p.length]



    // method3: 回溯法
    // 定义匹配方法 match(i, j), 分别代表 s 的第i至末尾的字符 与 p 的第j至末尾的字符
    // 思路: 终止条件, 当 j = p.length 代表p已经走完, 无法继续匹配. 若此时 i == s.length 则说明完全匹配, 反之未匹配完
    // 递归分支:  与 动态规划类似

    var lenS = s.length;
    var lenP = p.length;
    var map = {};

    return match(0, 0);

    function match(idxS, idxP) {
        if (map[idxS + ':' + idxP] !== undefined) return map[idxS + ':' + idxP];
        if (idxS > lenS) return false;
        if (idxS === lenS && idxP === lenP) return true;

        if (p[idxP] === '.' || p[idxP] === s[idxS]) {
            map[idxS + ':' + idxP] = p[idxP + 1] === '*' ?
                match(idxS + 1, idxP) || match(idxS, idxP + 2) :
                match(idxS + 1, idxP + 1);
        } else {
            map[idxS + ':' + idxP] = p[idxP + 1] === '*' ?
                match(idxS, idxP + 2) : false;
        }
        return map[idxS + ':' + idxP];
    }


};
// @lc code=end
