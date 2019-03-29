/*
 * @lc app=leetcode id=14 lang=javascript
 *
 * [14] Longest Common Prefix
 *
 * https://leetcode.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (33.15%)
 * Total Accepted:    429.1K
 * Total Submissions: 1.3M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * Write a function to find the longest common prefix string amongst an array
 * of strings.
 * 
 * If there is no common prefix, return an empty string "".
 * 
 * Example 1:
 * 
 * 
 * Input: ["flower","flow","flight"]
 * Output: "fl"
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: ["dog","racecar","car"]
 * Output: ""
 * Explanation: There is no common prefix among the input strings.
 * 
 * 
 * Note:
 * 
 * All given inputs are in lowercase letters a-z.
 * 
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {

    // 正方向
    // √ Your runtime beats 79.39 % of javascript submissions
    // √ Your memory usage beats 51.97 % of javascript submissions(35 MB)
    // if (strs.length === 1) return strs[0]
    // let firstStr = strs[0]
    // let common = ""
    // if(!firstStr) return common
    
    // for(let i = 0; i <= firstStr.length; i++){
    //     let letter = firstStr[i]
    //     // console.log(i, firstStr, letter, common)
    //     for (let j = 1; j < strs.length; j++){
    //         if (!strs[j] || !strs[j][i] || letter != strs[j][i]) return common
    //     }
    //     common += letter
    // }
    // return common
    

    // best 反方向
    let common = strs[0]
    if(!common) return ""
    for(let i = 1; i < strs.length; i++){
        while (strs[i].indexOf(common) != 0) {
            common = common.substring(0, common.length -1)
            if(!common) return ""
        }

    }
    return common
};

