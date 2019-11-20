/**
 * 高楼扔鸡蛋
 * 
 * 你面前有一栋从 1 到N共N层的楼，然后给你K个鸡蛋（K至少为 1）。
 * 现在确定这栋楼存在楼层0 <= F <= N，在这层楼将鸡蛋扔下去，鸡蛋恰好没摔碎（高于F的楼层都会碎，低于F的楼层都不会碎）。
 * 现在问你，最坏情况下，你至少要扔几次鸡蛋，才能确定这个楼层F呢？
 * 
 * 解题思路: 这个问题有什么"状态", 有什么"选择", 然后穷举
 * 状态: 当前鸡蛋数K, 需要测试的楼层N
 * 选择: 在第几楼扔鸡蛋
 * 
 * 状态转移: 在 i 楼扔了鸡蛋,   1: 碎了,  后续需要测试次数: dp[K - 1, i - 1]
 *                            0: 没碎,  后续需要测试次数: dp[K, N - i]
 * 
 * 
 * 
 */

function eggDrop(K, N) {

    let memo = {}
    function dp(K, N) {
        if(K == 1) return N     // 1个鸡蛋时需要逐层测试
        if(N == 0) return 0     // 0层时不需要测试
        // 消除重叠子问题
        if ((K + "_" + N) in memo) return memo[K + "_" + N]
        let res = Infinity
        for(let i = 1; i <= N; i++) {
            res = Math.min(res, Math.max(dp(K - 1, i - 1), dp(K, N - i)) + 1)
        }
        memo[K + "_" + N] = res
        return res
    }

    return dp(K, N)
}

console.log(eggDrop(2, 100))    // 14