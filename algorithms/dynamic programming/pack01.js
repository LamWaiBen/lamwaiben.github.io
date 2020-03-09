/**
 * 01背包问题
 * 给你一个可装载重量为W的背包和N个物品，每个物品有重量和价值两个属性。
 * 其中第i个物品的重量为wt[i]，价值为val[i]，现在让你用这个背包装物品，最多能装的价值是多少？ 
 * 举个简单的例子，输入如下：    
 * N = 3, W = 4
 * wt = [2, 1, 3]
 * val = [4, 2, 3]
 * 
 * 参考文章: https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485064&idx=1&sn=550705eb67f5e71487c8b218382919d6&chksm=9bd7f880aca071962a5a17d0f85d979d6f0c5a5ce32c84b8fee88e36d451f9ccb3bb47b88f78&scene=126&sessionid=1583727303&key=0d43bcf8ab4f64b3d97b9b4ab8e1cffc9392647e97b849136dbcd98f4754194576dd9ae71de8c91a95722e468fa62e9bc93aa99632ea82ee32f979fea59a292f1940337664322f9adaef75b85fd91126&ascene=1&uin=NzQzODgyNjYx&devicetype=Windows+7&version=62080079&lang=zh_CN&exportkey=AU6RlxeQzZXRgHreOMYmMPU%3D&pass_ticket=4J6CyhMY0bcjm5ei6LM7oaNtTlXC5nSr%2FeiVwhw2Bq9kSn%2BFCCMWgiU8NmSCMwo0
 */


// 解题思路:
// 状态: 1. 背包容量  2. 可选物品
// 选择: 1, 放进背包  2. 不放进背包
function cal(W, N, wt, val) {
    const dp = Array(W + 1).fill(0).map(v => Array(N + 1).fill(0))
    for (let i = 1; i <= W; i++) {
        for (let j = 1; j <= N; j++) {
            let w = wt[j - 1]
            let v = val[j - 1]
            // // 不装
            // dp[i][j] = dp[i][j - 1]

            // // 装
            // dp[i][j] = dp[i - w][j - 1] + v
            
            if(i - w < 0) {     // 超出背包容量时不装
                dp[i][j] = dp[i][j - 1]
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - w][j - 1] + v)
            }
        }
    }
    console.log(dp)
    return dp[W][N]
}