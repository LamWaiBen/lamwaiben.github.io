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
    // if (!root) return
    // if (root.left) {
    //     if (root.right) {
    //         let leftRightNode = root.left
    //         while (leftRightNode.right) {
    //             leftRightNode = leftRightNode.right
    //         }
    //         leftRightNode.right = root.right
    //     }
    //     root.right = root.left
    //     root.left = null
    // }
    // return flatten(root.right)

    let pre = null
    travese(root)
    function travese(node){
        if(!node) return
    
        travese(node.right)
        travese(node.left)

        node.right = pre
        node.left = null
        pre = node      // 借助递归的思想, 自下而上拿到底层的节点并记录下来
    }
};



// @lc code=end