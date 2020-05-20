/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    // 根 -> 左 -> 右
    if (!root) return
    if (root.left) {
        if (root.right) {
            let leftRightNode = root.left
            while (leftRightNode.right) {
                leftRightNode = leftRightNode.right
            }
            leftRightNode.right = root.right
        }
        root.right = root.left
        root.left = null
    }
    return flatten(root.right)
};

// @lc code=end

