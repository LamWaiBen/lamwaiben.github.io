/*
 * @lc app=leetcode id=83 lang=javascript
 *
 * [83] Remove Duplicates from Sorted List
 *
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/
 *
 * algorithms
 * Easy (42.14%)
 * Total Accepted:    313.7K
 * Total Submissions: 743.5K
 * Testcase Example:  '[1,1,2]'
 *
 * Given a sorted linked list, delete all duplicates such that each element
 * appear only once.
 * 
 * Example 1:
 * 
 * 
 * Input: 1->1->2
 * Output: 1->2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 1->1->2->3->3
 * Output: 1->2->3
 * 
 * 
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
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    // if(!head || !head.next) return head
    // let nextNode = head.next
    // if(head.val === nextNode.val){
    //     head.next = nextNode.next
    //     deleteDuplicates(head)
    // }else{
    //     deleteDuplicates(head.next)
    // }
    // return head

    // best
    if (!head || !head.next) return head
    head.next = deleteDuplicates(head.next)
    return head.val === head.next.val ? head.next : head
};

