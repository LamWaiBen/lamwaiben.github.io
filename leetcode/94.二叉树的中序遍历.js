/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * @return {number[]}
 */
var inorderTraversal = function(root, res = []) {
        if (!root) return [];
        const nodeList = [];
        let p = root;
        // 遍历
        while (p != null || nodeList.length) {
            if (p != null) {
                nodeList.push(p);
                p = p.left;
            } else {
                p = nodeList.pop();
                res.push(p.val);
                p = p.right;
            }
        }

        return res;
    
    // 递归
    // inorderTraversal(root.left, res)
    // res.push(root.val)
    // inorderTraversal(root.right, res)
    // return res
};
// @lc code=end

