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
 * 3.根据得到的状态转移方程设计代码
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
  * 
  * 维护一个dp数组, 使得dp[ i]表示以第i元素为结尾的最长上升子序列长度, 对于每个dp[ i]而言 ,初始值为1
  *
  * @param {Array} arr 
  * @returns {Number} 
  * 
  * eg:  [ 1, 5, 3, 4, 6, 9, 7, 8]的LIS为 [ 1, 3, 4, 6, 7, 8], 长度为6
  */
 function solutionLIS(arr) {
    let dp = new Array(arr.length).fill(1)
    let maxLength = 0

    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < i; j++){
            if(arr[j] < arr[i]){
                // 判断是否可以组成上升子序列
                // 且保存当前状态的最优解
                dp[i] = Math.max(dp[i], dp[j] + 1)

                maxLength = Math.max(maxLength, dp[i])
            }
        }
    }
     return maxLength
 }



 /**
  * 时间复杂度O(nlog n) 解法
  * 
  * O(n2)的解法其实是暴力枚举, 但是其实存在很多没必要的状态的枚举. 可以有以下优化
  * 试想, 如果我们当前的上升子序列长度已经确定,
  * 那么如果这种长度的子序列的结尾元素越小,后面的元素就更容易加入到这条臆想的上升子序列中
  * 
  * 所有,将原来的dp数组的储存由数值换成该序列中,上升最小子序列长度为i的上升子序列的最小末位数值
  * 
  * 
  */

function solutionLIS_faster(arr) {
    if(arr.length === 0) return 0
    let dp = [arr[0]]
    let len = 1
    for(let i = 1; i < arr.length; i++){
        let p = 0, q = len, mid = 0;
        if(arr[i] > dp[len - 1]){
            // 如果大于dp数组的末尾, 则延长dp数组长度
            dp[len++] = arr[i]
        }else{
            // 如果小于dp数组最小的末尾, 那么在dp数组中需要不断往前找, 
            // 直至确保目前状态下, dp[i]的值是最小的
            // 这里采用 二分法查找, 是时间复杂度将成 nlog n的关键 
            while(p < q){
                mid = parseInt((p + q)/2)
                if(dp[mid] > arr[i]){
                    q = mid
                }else{
                    p = mid + 1
                }
            }
            dp[p] = Math.min(arr[i], dp[p])
        }
    }
    return dp.length
}
