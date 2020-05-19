/*
 * @lc app=leetcode.cn id=108 lang=javascript
 *
 * [108] 将有序数组转换为二叉搜索树
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if(!nums.length) return null

    // 递归:  nums可以理解成中序遍历的得到结果
    // let midIndex = parseInt(nums.length / 2)
    // let tree = new TreeNode(nums[midIndex])
    // tree.left = sortedArrayToBST(nums.slice(0, midIndex))
    // tree.right = sortedArrayToBST(nums.slice(midIndex + 1))
    // return tree
};
// @lc code=end