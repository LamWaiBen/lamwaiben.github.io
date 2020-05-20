/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
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
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let path = [], res = [];
    inorderTraverse(root, sum, path, res)
    // console.log(res)
    return res
};

function inorderTraverse(root, sum, path, res) {
    if (!root) return
    path.push(root.val)
    sum -= root.val
    if (!root.left && !root.right) {
        // 前序遍历, 只处理左右叶子节点
        if (sum === 0) {
            res.push(path)
        }
        return
    }
    inorderTraverse(root.left, sum, path.slice(), res)
    inorderTraverse(root.right, sum, path.slice(), res)
}
// @lc code=end

