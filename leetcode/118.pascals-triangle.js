/*
 * @lc app=leetcode id=118 lang=javascript
 *
 * [118] Pascal's Triangle
 */
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    if(numRows === 0) return []
    let i = 1
    let arr = [[1]]
    while (i < numRows) {
        let next = []
        let prev = arr[i - 1]
        let pLength = prev.length
        // 在每一行的数组前后增加一位0拼凑结构, 可以使用优雅的方式处理
        for(let j = -1; j < pLength; j++){
            let v1 = prev[j] || 0
            let v2 = prev[j + 1] || 0
            next.push(v1 + v2)
        }
        arr.push(next)
        i++
    }
    return arr
};

