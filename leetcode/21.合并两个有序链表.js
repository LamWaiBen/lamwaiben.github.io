/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    const res = new ListNode(-1)
    let tmp = res
    while (l1 && l2) {
        if(l1.val <= l2.val) {
            tmp.next = l1;
            l1 = l1.next
        } else {
            tmp.next = l2;
            l2 = l2.next
        }
        tmp = tmp.next
    }
    tmp.next = l1 === null ? l2 : l1
    return res.next
};
// @lc code=end

