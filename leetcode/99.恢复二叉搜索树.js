/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
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
// 初始版本
var recoverTree = function(root) {
    let res = checkNode(root)
    if (res){
        swap(res[0], res[1])
        recoverTree(root)
    }
};

function checkNode(node, minNode, maxNode) {
    // 左子节点要比当前父节点小, 右节点要比当前父节点大, 但是比父父节点小
    if (!node) return false
    if (minNode != undefined && node.val <= minNode.val) return [node, minNode]
    if (maxNode != undefined && node.val >= maxNode.val) return [node, maxNode]
    return checkNode(node.left, minNode, node) || checkNode(node.right, node, maxNode)
}

function swap(node1, node2) {
    let tmp = node1.val
    node1.val = node2.val
    node2.val = tmp
}


// 中序遍历版
// var recoverTree = function(root) {
//     let t1 = null, t2 = null, pre = null;
//     inorder(root);
//     let temp = t1.val;
//     t1.val = t2.val;
//     t2.val = temp;

//     function inorder(root) {
//         if(!root) return;
//         inorder(root.left)
//         // 中序遍历:  左 < 根 < 右,  合法的规则是: pre < root, 根据这个关系找到两个错误的节点
//         if(pre != null && pre.val > root.val) {
//             if(t1 == null) t1 = pre
//             t2 = root;
//         }
//         pre = root;
//         inorder(root.right)
//     }

// }
// @lc code=end
