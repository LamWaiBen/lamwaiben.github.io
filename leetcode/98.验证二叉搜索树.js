/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
var isValidBST = function(root) {
    return checkNode(root)
};


function checkNode(node, minVal, maxVal) {
    // 左子节点要比当前父节点小, 右节点要比当前父节点大, 但是比父父节点小
    if(!node) return true
    if (minVal != undefined && node.val <= minVal) return false
    if (maxVal != undefined && node.val >= maxVal) return false
    return checkNode(node.left, minVal, node.val) && checkNode(node.right, node.val, maxVal)
}
// @lc code=end

