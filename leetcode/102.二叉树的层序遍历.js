/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return []
    let nodeList = [root]
    let tmp = []
    let res = [[root.val]]

    while (nodeList.length) {
        let node = nodeList.shift()
        if(node) {
            node.left && tmp.push(node.left)
            node.right && tmp.push(node.right)
        }

        if (0 === nodeList.length && tmp.length) {
            res.push(tmp.map(v => v ? v.val : null))
            nodeList = tmp
            tmp = []
        }
    }
    return res
};
// @lc code=end

