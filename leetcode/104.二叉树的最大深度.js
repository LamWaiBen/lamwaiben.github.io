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
var maxDepth = function(root) {
    if(!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
    // if(!root) return 0
    // let depth = 0
    // let nodeList = [root]
    // let tmp = []
    // while (nodeList.length) {
    //     let node = nodeList.shift()

    //     if(node) {
    //         tmp.push(node.left)
    //         tmp.push(node.right)
    //     }
    //     if (nodeList.length === 0 && tmp.length) {
    //         depth +=1 
    //         nodeList = tmp
    //         tmp = []
    //     }
    // }
    // return depth
};
// @lc code=end

