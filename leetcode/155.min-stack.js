/*
 * @lc app=leetcode id=155 lang=javascript
 *
 * [155] Min Stack
 */
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    // 题目要求获取最小值的复杂度为O(1), 所以需要辅助栈来实现
    // 当存在比栈内已有元素小的值的时候, 才往辅助栈push值, 如果比辅助栈大则不需要push, 因为栈低已有一个比待push元素小的值
    // push: 2   push : 3
    // stack:  [2]  ,   [2, 3]      由于3是压着2的, 所以不需要把3push到minStack中
    // minStack:  [2]
    this.stack = []
    this.min_stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x)
    if(this.min_stack.length === 0 || x <= this.min_stack[this.min_stack.length - 1]){
        this.min_stack.push(x)
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    let x = this.stack.pop()
    if (x === this.min_stack[this.min_stack.length - 1]) this.min_stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1]
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

