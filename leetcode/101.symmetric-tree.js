/*
 * @lc app=leetcode id=101 lang=javascript
 *
 * [101] Symmetric Tree
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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    return check(root, root)
    
    function check(left, right){
        if(left === null) return right === null
        if(right === null) return left === null
        if(left.val != right.val) return false
        return check(left.left, right.right) && check(left.right, right.left)
    }
};

