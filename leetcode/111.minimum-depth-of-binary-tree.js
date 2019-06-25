/*
 * @lc app=leetcode id=111 lang=javascript
 *
 * [111] Minimum Depth of Binary Tree
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
// var minDepth = function(root) {
//     if(!root) return 0
//     if (root.left === null) return minDepth(root.right) + 1
//     if (root.right === null) return minDepth(root.left) + 1
//     return Math.min(minDepth(root.left), minDepth(root.right)) + 1
// };

// 另一种解法 层次遍历
var minDepth = function (root){
    if(!root) return 0
    let queue = [root]
    let list = []
    let level = 1

    while (queue.length) {
        for(let i = 0; i < queue.length; i++){
            let node = queue[i]
            if(node.left === null && node.right === null) return level
            if(node.left) list.push(node.left)
            if(node.right) list.push(node.right)
        }
        level += 1
        queue = list
        list = []
    }

    return level
}

