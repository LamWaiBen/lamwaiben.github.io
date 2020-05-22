/*
 * @lc app=leetcode.cn id=143 lang=javascript
 *
 * [143] 重排链表
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
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    let node = head
    let arr = []
    while (node) {
        arr.push(node)
        let tmp = node.next
        node.next = null
        node = tmp
    }
    
    // let len = arr.length
    // let mid = parseInt(len / 2)
    // let tmp = arr[0]
    // for (let i = 0; i <= mid; i++) {
    //     if (!tmp) {
    //         tmp = arr[i]
    //     } else {
    //         tmp.next = arr[i]
    //         tmp = tmp.next
    //     }
    //     if (len - i - 1 > mid) {
    //         tmp.next = arr[len - i - 1]
    //         tmp = tmp.next
    //     }
    // }

    // 双指针
    let i = 1, j = arr.length - 1
    let tmp = arr[0]
    while (i <= j) {
        tmp.next = arr[j--]
        if(i <= j) {
            tmp.next.next = arr[i++]
            tmp = tmp.next.next
        }
    }

};
// @lc code=end

