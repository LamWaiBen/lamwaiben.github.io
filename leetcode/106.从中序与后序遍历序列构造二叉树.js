/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    if(!inorder.length || !postorder.length) return null
    let rootVal = postorder[postorder.length - 1]
    let inorderRootIndex = inorder.indexOf(rootVal) // 根据中序遍历的数组, 知道左右子节点的个数, 然后再去切割后序遍历的数组
    let tree = new TreeNode(rootVal)
    tree.right = buildTree(inorder.slice(inorderRootIndex + 1), postorder.slice(inorderRootIndex, -1))
    tree.left = buildTree(inorder.slice(0, inorderRootIndex), postorder.slice(0, inorderRootIndex))
    return tree
};
// @lc code=end

