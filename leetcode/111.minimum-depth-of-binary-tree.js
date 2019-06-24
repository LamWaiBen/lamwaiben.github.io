/*
 * @lc app=leetcode id=111 lang=javascript
 *
 * [111] Minimum Depth of Binary Tree
 */
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
    if(!root) return 0
    if(root.left) return minDepth(root.left) + 1
    else if(root.right) return minDepth(root.right) + 1
    return Math.min(minDepth(root.left) + 1, minDepth(root.right) + 1)
};

// 另一种解法 层序遍历


