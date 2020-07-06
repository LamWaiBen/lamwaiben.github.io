/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */

var findTargetSumWays = function (nums, S) {
    // 把 nums 划分成两个子集 A 和 B，分别代表分配 + 的数和分配 - 的数，那么他们和 target 存在如下关系：
    // sum(A) - sum(B) = target;
    // sum(A) = target + sum(B);
    // sum(A) + sum(A) = target + sum(B) + sum(A);
    // 2 * sum(A) = target + sum(nums);

    let sum = nums.reduce((a, b) => a + b, 0);

    if(sum < S || (sum + S) % 2 === 1) {
        // 这两种情况不存在解
        return 0
    }

    // 计算 nums 中有几个子集的和为 sum,  转换成背包问题
    function subsets(nums, sum) {
        const n = nums.length
        const dp = Array(n + 1).fill(0).map(v => Array(sum + 1).fill(0)) // dp[i][j] i 表示剩余几个数, j表示需要求的和 sum
        for(let i = 0; i <= n; i++) {
            dp[i][0] = 1    // 当sum为0 时, 只有一种解法(所有数都不取)
        }

        for(let i = 1; i <= n; i++) {
            for(let j = 0; j <= sum; j++) {
                if(j >= nums[i - 1]) {
                    // 放和不放的选择之和
                    dp[i][j] = dp[i-1][j - nums[i - 1]] + dp[i-1][j]
                } else {
                    // 空间不足, 只能选择不放
                    dp[i][j] = dp[i - 1][j]
                }
            }
        }

        return dp[n][sum]
    }
    return subsets(nums, (S + sum) / 2)
};
// @lc code=end






// 方法一: 回溯
// var findTargetSumWays = function(nums, S) {
//     const len = nums.length
//     let result = 0
//     function backtrack(i, sum) {
//         if(i === len) {
//             if(sum === S) {
//                 result++
//                 return
//             }
//             return
//         }

//         backtrack(i + 1, sum + nums[i])
//         backtrack(i + 1, sum - nums[i]);
//     }
//     backtrack(0, 0)
//     return result;
// };




// 如何优化回溯算法
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485700&idx=1&sn=433fc5ec5e03a86064d458320332a688&chksm=9bd7f70caca07e1aad658333ac05df501796862a418d8f856b12bb6ca73a924552901ec86d9b&scene=126&sessionid=1593997460&key=6ece514822162b1e06a39495946316fa56d3fc2a9f8450c5a450a5b6501da6f49c4f650952882ccb968322f830c35457c0fa22014d0530f0a78407d33641ce2b4a73b121d7d843294b9c996046a53c1b&ascene=1&uin=NzQzODgyNjYx&devicetype=Windows+7+x64&version=62090529&lang=zh_CN&exportkey=AVztubHKgyIYO0hvgN6ave0%3D&pass_ticket=AVGvyIpVCZ2hXoqLwGFMRn7uboNU1Txbn3zanThp1hUA8MWAw7u3jv8Rx1xOQH1y
// 方法二: 借助备忘录, 消除重叠子问题,  相当于剪枝, 底层仍然是暴力穷举
// var findTargetSumWays = function (nums, S) {
//     const hashMap = new Map()   // 备忘录缓存结果, 当在某个位置index, 剩余某个rest的时候, 它的result可以缓存起来
//     function dp(nums, i, rest) {
//         if(i >= nums.length) {
//             if(rest === 0) {
//                 return 1
//             }
//             return 0
//         }

//         const key = `${i},${rest}`;
//         if(hashMap.has(key)){
//             return hashMap.get(key)
//         }

//         const result = dp(nums, i + 1, rest - nums[i]) + dp(nums, i + 1, rest + nums[i]);
//         hashMap.set(key, result);
//         return result
//     }
//     return dp(nums, 0, S)
// };