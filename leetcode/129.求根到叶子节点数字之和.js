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
    function vlr(root, val){
        if(!root) return ""
        val += root.val
        if(!root.left && !root.right) return val
        return Number(vlr(root.left, val)) + Number(vlr(root.right, val))
    }
    return vlr(root, '')
};

// @lc code=end

