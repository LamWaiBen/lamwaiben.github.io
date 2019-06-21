/*
 * @lc app=leetcode id=108 lang=javascript
 *
 * [108] Convert Sorted Array to Binary Search Tree
 */

// Definition for a binary tree node.
 function TreeNode(val) {
     this.val = val;
     this.left = this.right = null;
 }

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if(nums.length === 0) return null
    let mid = parseInt(nums.length / 2)

    let root = new TreeNode(nums[mid])
    if(mid > 0) root.left = sortedArrayToBST(nums.slice(0, mid))
    if(mid +1 < nums.length) root.right = sortedArrayToBST(nums.slice(mid+1))
    return root
};


