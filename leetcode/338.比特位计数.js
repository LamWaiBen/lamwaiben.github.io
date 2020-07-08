/*
 * @lc app=leetcode.cn id=338 lang=javascript
 *
 * [338] 比特位计数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
    const result = []
    for(let i = 0; i <= num; i++) {
        let j = i
        let count = 0;
        while (j > 0) {
            count += j % 2;
            j = j >> 1;
        }
        result.push(count)
    }
    return result
};

// @lc code=end


// console.log(countBits(2)); // [0,1,1]
// console.log(countBits(5)); // [0,1,1,2,1,2]