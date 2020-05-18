/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (!preorder.length || !inorder.length) return null

    let inorderRootIndex = inorder.indexOf(preorder[0])
    let root = new TreeNode(preorder[0])
    root.left = buildTree(preorder.slice(1, 1 + inorderRootIndex), inorder.slice(0, inorderRootIndex))
    root.right = buildTree(preorder.slice(1 + inorderRootIndex), inorder.slice(inorderRootIndex + 1))

    return root
};
// @lc code=end

