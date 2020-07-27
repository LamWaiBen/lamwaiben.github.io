/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
var maxDepth = function (root) {
    if (!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1

    // bfs
    let nodeList = []
    let p = root
    while (p || nodeList.length > 0) {
        if (p) {
            // => p 前序遍历 父 -> 左 -> 右
            nodeList.push(p)
            p = p.left
        } else {
            p = nodeList.pop()
            // => p 中序遍历  左 -> 父 -> 右

            p = node.right
        }
    }
};
// @lc code=end

