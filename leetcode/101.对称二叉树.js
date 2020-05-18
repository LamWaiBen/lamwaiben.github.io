/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
 */
// 递归
var isSymmetric = function(root) {
    return compare(root, root)
};

function compare(t1, t2){
    if(t1 === null && t2 === null) return true
    if(!t1 || !t2) return false
    if(t1.val != t2.val) return false
    return compare(t1.left, t2.right) && compare(t1.right, t2.left)
}

// 遍历
// var isSymmetric = function(root) {
//     let list = [root];
//     let tmp = []
//     while (list.length) {
//         let item = list.shift()
//         if(item) {
//             tmp.push(item.left)
//             tmp.push(item.right)
//         }
//         if(list.length === 0) {
//             for (let i = 0; i < tmp.length; i++) {
//                 let left = tmp[i]
//                 let right = tmp[tmp.length - i - 1]
//                 if(left && right) {
//                     if(left.val != right.val) {
//                         return false
//                     }
//                 } else if(!(left == null && right == null)) {
//                     return false
//                 }
//             }
//             list = tmp
//             tmp = []
//         }
//     }
//     return true
// }
// @lc code=end

