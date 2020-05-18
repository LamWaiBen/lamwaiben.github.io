/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
    const dp = Array(n + 1).fill(0).map(v => [])
    if(n < 1) return []
    dp[0] = [null]
    // dp[1] = [new TreeNode(1)]
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            // dp[i] += dp[j - 1] * dp[i - j]
            for (let leftChild of dp[j - 1]) {
                for(let rightChild of dp[i - j]) {
                    // 根据BST定义, 新节点只能在右子树上排列, 可以看作右子树所有节点的值 + 1
                    let node = new TreeNode(j)
                    node.left = copyTree(leftChild)
                    node.right = traversalAddTree(node.val, copyTree(rightChild))
                    dp[i].push(node)
                }
            }
        }
    }
    return dp[n]
};

function copyTree(tree) {
    if(!tree) return null
    let newtree = new TreeNode(tree.val)
    newtree.left = copyTree(tree.left)
    newtree.right = copyTree(tree.right)
    return newtree
}

function traversalAddTree(val, node) {
    if (node == null) return null
    node.val = node.val + val
    traversalAddTree(val, node.left)
    traversalAddTree(val, node.right)
    return node
}

// @lc code=end

