/*
 * @lc app=leetcode id=110 lang=javascript
 *
 * [110] Balanced Binary Tree
 */
/* *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    if(!root) return true
    let dValue = treeHeight(root.left) - treeHeight(root.right)
    if (Math.abs(dValue) <= 1){
        return isBalanced(root.left) && isBalanced(root.right)
    }
    return false
};


function treeHeight(tree, height = 0){
    if (tree === null) return height
    height +=1
    return Math.max(treeHeight(tree.left, height), treeHeight(tree.right, height))
}


//高票答案
// var isBalanced = function (root) {
//     if (!root) return true
//     let depth = new Map
//     let s = []
//     let last

//     while (root || s.length) {
//         if (root) {
//             s.push(root)
//             root = root.left
//         } else {
//             root = s[s.length - 1]
//             if (!root.right || last == root.right) {
//                 last = s.pop()

//                 let left = depth.get(last.left) || 0
//                 let right = depth.get(last.right) || 0
//                 if (Math.abs(left - right) > 1) return false
//                 depth.set(last, 1 + Math.max(left, right))

//                 root = null
//             } else {
//                 root = root.right
//             }
//         }
//     }
//     return true
// };

