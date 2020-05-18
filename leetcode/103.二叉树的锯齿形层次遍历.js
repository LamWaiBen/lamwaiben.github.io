/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层次遍历
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
var zigzagLevelOrder = function(root) {
    if(!root) return []
    let nodeList = [root]
    let tmp = []
    let res = [[root.val]]
    let isL2R = false
    while (nodeList.length) {
        let node = nodeList.shift()
        // console.log('isL2R', isL2R, node)
        if(node) {
            node.left && tmp.push(node.left)
            node.right && tmp.push(node.right)
        }
        if(nodeList.length === 0 && tmp.length) {
            nodeList = tmp
            res.push((isL2R ? tmp : tmp.slice().reverse()).map(v => v ? v.val : null))
            tmp = []
            isL2R = !isL2R
        }
    }
    return res
};
// @lc code=end

