/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
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
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    if(!root) return true
    if (Math.abs(getNodeBF(root.left) - getNodeBF(root.right)) > 1) return false
    return isBalanced(root.left) && isBalanced(root.right)
};

function getNodeBF(node){
    if(!node) return 0
    if (!node.BF) node.BF = 1 + Math.max(getNodeBF(node.left), getNodeBF(node.right))
    return node.BF
}
// @lc code=end

