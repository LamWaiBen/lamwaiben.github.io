/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    // 递归
    // let res = []
    // traversal(root, res)
    // return res

    // function traversal(root, res) {
    //     if (!root) return
    //     traversal(root.left, res)
    //     traversal(root.right, res)
    //     res.push(root.val)
    // }


    // 遍历
    let nodeList = [], p = root, r = null;
    let res = []
    while (nodeList.length || p != null) {
        if (p != null) {
            nodeList.push(p)
            p = p.left
        } else {
            p = nodeList[nodeList.length - 1]
            if(p.right === null || p.right  === r) {
                res.push(p.val)
                r = p
                nodeList.pop()
                p = null
            }else {
                p = p.right
            }
        }
    }
    return res
};
// @lc code=end

