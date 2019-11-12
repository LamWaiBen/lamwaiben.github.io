/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // method1: 暴力解法
    // let maxStr = s[0] || ""
    // for(let i = 0; i < s.length - 1; i++){
    //     for(let j = s.length - 1; j > i; j--){
    //         if(j - i < maxStr.length) break

    //         let mid = ~~((j - i)/ 2)
    //         let p = 0
    //         let ret = true
    //         while (p <= mid) {
    //             if(s[i + p] != s[j - p]){
    //                 ret = false
    //                 break
    //             }
    //             p++
    //         }
    //         if(ret) maxStr = s.slice(i, j + 1)
    //     }
    // }
    // return maxStr

    // method2: 动态规划, 数组缓存
    // step0: 是否符合动态规划, 因为回文满足最优子结构和无后效性, 所以符合
    // step1: 分析当前局面状态, 可以用二维数组来表示回文子序列的起点,终点, T/F. 
    // step2: 找到状态转移方程, 
    // 当 arr[i + 1][j - 1] 为回文串
    // 且 j - i > 1, 因为 当 i=1 j=2时, arr[1][2] = arr[2][1] + 1, 而 arr[2][1] 显然是不符合回文规则的
    // 如果S[i] == S[j]成立的话,
    // 那么可以额得出状态转移方程 arr[i][j] = arr[i + 1][j - 1] + 1

    // step3: 根据状态转移方程设计代码
    // 由于 i 是依赖 i + 1 的值的, 所以 i 需要降序循环, j则需要升序
    let maxStr = s[0] || ""
    let p = Array(s.length).fill(0).map(v => Array(s.length).fill(0))
    let len = s.length

    for (let i = len - 1; i > -1; i--){
        for (let j = i; j < len; j++){
            // 如果 j - i < 2 时, 则不需要依赖之前的状态, 因为长度为1 是回文的起始长度
            if (s[i] == s[j] && (j - i < 2 || p[i + 1][j - 1])){
                p[i][j] = 1
            }
            if(p[i][j] && maxStr.length < j - i + 1){
                maxStr = s.substring(i, j + 1)
            }
        }
    }
    return maxStr

    // method3:  扩展中心法, 高票答案
    // 根据回文的特性, 选择一个中心, 向左右扩展判断字符串是否一样
    var max = '';
    for (var i = 0; i < s.length; i++) {
        for (var j = 0; j < 2; j++) {
            var left = i;
            var right = i + j;
            while (s[left] && s[left] === s[right]) {
                left--;
                right++;
            }
            if ((right - left - 1) > max.length) {
                max = s.substring(left + 1, right);
            }
        }
    }
    return max;
};
// @lc code=end

