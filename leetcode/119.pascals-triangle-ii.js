/*
 * @lc app=leetcode id=119 lang=javascript
 *
 * [119] Pascal's Triangle II
 */
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    // 空间复杂度太高 O(n)
    // let i = 0
    // let prev = [1]
    // let cur = []
    // while (i < rowIndex) {
    //     for(let j = -1; j < prev.length; j++){
    //         let v1 = prev[j] || 0
    //         let v2 = prev[j + 1] || 0
    //         cur.push(v1 + v2)
    //     }
    //     prev = cur
    //     cur = []
    //     i++
    // }

    // return prev

    // 想要降低杨辉三角的空间复杂度, 可以从数组的末端开始遍历会更便捷
    let i = 0
    let arr = [1]
    while (i < rowIndex) {
        for (let j = arr.length; j > 0; j--){
            if(j === arr.length) arr[j] = 1
            else{
                arr[j] = arr[j] + arr[j -1]
            }
        }
        i++
    }
    return arr
};

