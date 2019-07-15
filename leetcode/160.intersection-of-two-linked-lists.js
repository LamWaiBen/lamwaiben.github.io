/*
 * @lc app=leetcode id=160 lang=javascript
 *
 * [160] Intersection of Two Linked Lists
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let i = 0
    let listA = new Map()
    while (headA) {
        listA.set(headA, i++)
        headA = headA.next
    }

    while (headB) {
        if(!listA.has(headB)) headB = headB.next
        else return headB
    }
    return null
};

