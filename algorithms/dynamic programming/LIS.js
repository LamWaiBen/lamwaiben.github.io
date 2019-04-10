/**
 * 最长上升子序列 LIS
 * 给定长度为n的序列a, 从a中抽取出一个子序列,这个子序列需要单调递增.问最长的子序列(LIS)的长度是
 * eg: [ 1, 5, 3, 4, 6, 9, 7, 8]的LIS为 [ 1, 3, 4, 6, 7, 8], 长度为6
 * 
 * DP两个性质:
 * 1.无后效性: "未来与过去无关", 某个阶段的状态之后的发展过程不受这个阶段以前的各个状态影响
 * 2.最优子结构: 大问题的最优解可以由小问题的最优解退出 
 * 
 * 设计DP算法的关键
 * 1.设计当前局面的状态
 * 2.找出所需答案与哪些局面有关, 然后求出状态转移方程
 * 
 * 分析例子
 * 1.设计状态: 记f(x)为以ax结尾的LIST长度, 那么答案就是 max{f(x)}
 * 2.求出状态转移方程: 考虑比x小的每一个p: 如果 ax > ap, 则f(x) = f(p) + 1
 *    那么得出状态转移方程为 f(x) = max(p<x, ap<ax){f(p)} + 1
 *    时间复杂度为 O(n2)
 * 3.围绕状态转移方程编写代码
 * 
 * 实现方式:
 * 1.按顺序递推
 * 2.记忆化搜索
 */


 // eg:

 /**
  * LIS解法1  时间复杂度O(n2)
  * @param {Array} arr 
  * @returns {Number} 
  * 
  * eg:  [ 1, 5, 3, 4, 6, 9, 7, 8]的LIS为 [ 1, 3, 4, 6, 7, 8], 长度为6
  */
 function solutionLIS(arr) {
    let f = new Array(arr.length).fill(1)
    let maxLength = 0

    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < i; j++){
            if(arr[j] < arr[i]){
                f[i] = Math.max(f[i], f[j] + 1)

                maxLength = Math.max(maxLength, f[i])
            }
        }
    }
     return maxLength
 }



 /**
  * 时间复杂度O(nlog n) 解法
  */