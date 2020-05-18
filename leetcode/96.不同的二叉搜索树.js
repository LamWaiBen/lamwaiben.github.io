/*
 * @lc app=leetcode.cn id=96 lang=javascript
 *
 * [96] 不同的二叉搜索树
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    if(n == 0 || n == 1) return 1
    // 当 i 为根节点时, 左子树[1, 2, 3, ... i - 1], 右子树[i + 1, i + 2, ...n]
    // 所以 n 为 i 时,树的种数有: f(n) = f(0)*f(n-1) + f(1)*f(n-2) .... + f(n-2)*f(1) + f(n-1)*f(0) 
    // 递归版本
    // let res = 0
    // for(let i = 1; i <= n; i++) {
    //     res += numTrees(i - 1) * numTrees(n - i)
    // }
    // return res

    // 动态规划
    const dp = Array(n + 1).fill(0)
    dp[0] = 1
    for (let i = 1; i <= n; i++) {
        for(let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j]
        }
    }
    return dp[n]
};
// @lc code=end

