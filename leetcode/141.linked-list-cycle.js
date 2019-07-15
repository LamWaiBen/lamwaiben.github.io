/*
 * @lc app=leetcode id=141 lang=javascript
 *
 * [141] Linked List Cycle
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let linkedList = []
    let poniters = 0
    let curNode = head
    while (curNode) {
        if (linkedList[curNode.poniters]) return true
        curNode.poniters = poniters++
        linkedList.push(curNode)
        curNode = curNode.next
    }
    return false
};

