/*
 * @lc app=leetcode id=107 lang=javascript
 *
 * [107] Binary Tree Level Order Traversal II
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
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    // 解题思路: 把待读取的node放到栈中, 
    // 把已读的node放到队列中,  等所有node都获取之后, 再根据层级关系返回数据
    if(!root || root.val === null) return []
    let arr = []
    let nodeQueue = [root]
    let stack = [root]
    let lvs = [[0,1]]
    let pointer = 1

    while (stack.length) {
        let node = stack.pop()
        if (node && node.val !== null){
            if (node.left && node.left.val !== null){
                nodeQueue.unshift(node.left)
            }
            if (node.right && node.right.val !== null){
                nodeQueue.unshift(node.right)
            }
        }

        if(stack.length === 0){
            if(pointer != nodeQueue.length){
                stack = nodeQueue.slice(0, nodeQueue.length - pointer)
                pointer = nodeQueue.length
                lvs.push([
                    lvs[lvs.length - 1][1], pointer
                ])
            }
        }
    }
    for(let i = lvs.length - 1; i >= 0; i--){
        let group = lvs[i]
        let startIndex = nodeQueue.length - group[1]
        let endIndex = nodeQueue.length - group[0]
        
        let tmp = nodeQueue.slice(startIndex, endIndex).map(v => v.val)
        arr.push(tmp.reverse())
    }
    return arr
};

