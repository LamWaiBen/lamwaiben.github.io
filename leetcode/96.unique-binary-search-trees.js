/*
 * @lc app=leetcode id=96 lang=javascript
 *
 * [96] Unique Binary Search Trees
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    /* 
        假设存在n个节点存在二叉排列树的个数是G(n), 1为根节点, 2为根节点....n为根节点
        当1为根节点的时候, 其左子树节点个数为0, 右子树节点为n-1, 当2为根节点的时候, 左子树节点个数为1, 又节点个数为n-2 ...
        所以可以得到公式 G(n) = G(0)*G(n-1) + G(1)*G(n-2) +... + G(n-1)*G(0)
    */
    const dp = Array(n + 1).fill(0)
    dp[0] = 1
    dp[1] = 1
    for(let i = 2; i <= n; i++){
        for(let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j]
        }
    }
    return dp[n]
};
// @lc code=end

/* 
    1-3-2
    3-2-1
    3-1-2
    1-2-3


*/