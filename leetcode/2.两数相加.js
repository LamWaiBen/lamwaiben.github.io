/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let root = null
    let node = null
    let genNum = 0
    while (l1 || l2) {
        let sum = genNum;
        if(l1) sum += l1.val
        if(l2) sum += l2.val

        genNum = parseInt(sum / 10);
        sum %= 10;
        if (!root) {
            root = node = new ListNode(sum);
        } else {
            node = node.next = new ListNode(sum);
        }
        l1 = l1 ? l1.next : l1;
        l2 = l2 ? l2.next : l2;
    }

    if(genNum) {
        node.next = new ListNode(genNum);
    }
    return root;
};
// @lc code=end

