/*
 * @lc app=leetcode.cn id=129 lang=javascript
 *
 * [129] 求根到叶子节点数字之和
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
var sumNumbers = function(root) {
    const arr = []
    preorder(root, '', arr)
    return arr.reduce((sum, val) => sum += Number(val), 0)
};

function preorder(root, val, arr) {
    if(!root) return ""

    val += root.val
    if(!root.left && !root.right) {
        arr.push(val)
    }
    preorder(root.left, val, arr)
    preorder(root.right, val, arr)
}
// @lc code=end

