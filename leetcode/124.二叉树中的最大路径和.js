/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
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
var maxPathSum = function(root) {
    let ret = Number.MIN_SAFE_INTEGER
    getMax(root)
    return ret
    function getMax(root) {
        if (!root) return 0
        // 后序遍历, 求出左右两子树的最大值, 再决定是否相加
        const leftMax = Math.max(0, getMax(root.left))
        const rightMax = Math.max(0, getMax(root.right))
        ret = Math.max(ret, leftMax + rightMax + root.val)
    
        return Math.max(leftMax, rightMax) + root.val
    }
};
// @lc code=end