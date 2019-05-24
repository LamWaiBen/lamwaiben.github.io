/*
 * @lc app=leetcode id=104 lang=javascript
 *
 * [104] Maximum Depth of Binary Tree
 */
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
    return childNum(root)    
    function childNum(node){
        if (node === null) return 0
        let num = 1
        let leftNum = num
        let rightNum = num
        if(node.left){
            leftNum += childNum(node.left)
        }
        
        if(node.right){
            rightNum += childNum(node.right)
        }
        return Math.max(leftNum, rightNum)
    }

    // // best
    // if (root === undefined || root === null) {
    //     return 0;
    // }
    // return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

