/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
var preorderTraversal = function(root) {
    // 递归
    // let res = []
    // traversal(root, res)
    // return res

    // function traversal(root, res) {
    //     if(!root) return
    //     res.push(root.val)
    //     traversal(root.left, res)
    //     traversal(root.right, res)
    // }

    // 遍历
    // 队列:  [根节点]  ->  [根节点, 根的左节点]  ->  [根节点]  ->  [根节点, 根的右节点]
    let nodeList = [], p = root, r = null;
    let res = []
    while (nodeList.length || p != null) {
        if (p != null) {
            res.push(p.val)
            nodeList.push(p)        // nodeList 缓存父节点
            p = p.left
        } else {
            p = nodeList[nodeList.length - 1]
            if (p.right === null || p.right === r) {
                r = p       // 标记节点,  下次判断时可以区分是父节点出栈还是右节点出栈
                nodeList.pop()
                p = null
            } else {
                p = p.right
            }
        }
    }
    return res
};
// @lc code=end

