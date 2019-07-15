/*
 * @lc app=leetcode id=167 lang=javascript
 *
 * [167] Two Sum II - Input array is sorted
 */
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let p1 = 0, p2 = numbers.length;
    let midIndex = parseInt((p1 + p2) / 2)
    let mid = numbers[midIndex]
    // 先二分
    while (target <= mid && p2 - p1 > 2) {
        p2 = midIndex - 1
        midIndex = parseInt((p1 + p2) / 2)
        mid = numbers[midIndex]
    }
    
    while (p1 < p2) {
        let sum = numbers[p1] + numbers[p2]
        if (sum === target) return [p1 + 1, p2 + 1]
        else if(sum < target) p1++
        else p2--
    }
};

