/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    let result = [];
    let len = candidates.length;
    candidates.sort((a, b) => a - b)

    function backtrack(i, tmpSum, tmpRes){
        if (tmpSum > target || i === len) return
        if(tmpSum === target) {
            result.push(tmpRes)
            return
        }
        
        for(let j = i; j < len; j++) {
            if(tmpSum + candidates[j] > target) break;

            backtrack(j, tmpSum + candidates[j], tmpRes.concat(candidates[j]))
        }
    }

    backtrack(0, 0, [])
    return result;
};
// @lc code=end

console.log(combinationSum([2,3,5], 7));
// [[2,2,3],[2,5]]
console.log(combinationSum([2, 3, 5], 8));
// [[2,2,2,2],[2,3,3],[3,5]]