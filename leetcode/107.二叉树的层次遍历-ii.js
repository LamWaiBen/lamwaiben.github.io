/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层次遍历 II
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
var levelOrderBottom = function(root) {
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

        if(nodeList.length === 0 && tmp.length){
            res.unshift(tmp.map(v => v ? v.val : v))
            nodeList = tmp
            tmp = []
        }
    }
    return res
};
// @lc code=end

