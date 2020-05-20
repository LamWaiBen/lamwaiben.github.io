/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
 * @return {number}
 */
var minDepth = function(root) {
    if (!root) return 0
    let leftDepth = minDepth(root.left)
    let rightDepth = minDepth(root.right)
    return 1 + (Math.min(leftDepth, rightDepth) || leftDepth || rightDepth)
};
// @lc code=end

