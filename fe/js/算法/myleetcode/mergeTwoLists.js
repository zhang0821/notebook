/**
 * Definition for singly-linked list.
 function ListNode(val) {
     this.val = val;
     this.next = null;
 }
 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

 示例：

 输入：1->2->4, 1->3->4
 输出：1->1->2->3->4->4

*/
/**
 * mergeTwoLists 合并两个有序链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var mergeTwoLists = function(l1, l2) {
    let len = l1.length;
    if (len > l2.length) {
        len = l2.length;
    }

    for (let i=0; i<len;i++) {
        if (l1[i].val <= l2[i].val) {

        }
    }


};

function ListNode(val) {
    this.val = val;
    this.next = null;
}

mergeTwoLists([new ListNode(1), new ListNode(2),new ListNode(4)],[new ListNode(1),new ListNode(3),new ListNode(4)]);