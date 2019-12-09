/**
 * dijkstra 算法
 * 适用: 单源最短路径问题, 非负路径
 * 原理: BFS, 贪心 
 * 
 * 参考: https://blog.csdn.net/csdnxcn/article/details/80057574
 * 设计思路:
 * step1:
 *   假设源点为V0, 那么最短路径的顶点集合Q中只有V0, 和无法到达顶点集合R中有V1, V2,V3....
 * step2: 
 *   设计distance数组
 * step3: 
 *   以源点为中转跳点, 在一堆未确认的点中,找到距离最小的那个, 这个点则可以确认为最近的点, 再以这个点与其他点组成的边, 进行松弛操作, 找到下一个最近的点
 * stpe4:
 *   改变step3中的源点, 一直重复, 最终可以得到最后的结果
 * 
 * *关键*:
 *   理解为什么在一堆估计值中可以找到一个确定值?
 *   
 *   首先, 已知的估计值肯定是目前已知路径的最小的一个值, 那么为什么可以确定未知路径一定不会比已知路径短呢? 因为未知路径肯定是在已知路径上去继续的, 
 *   那么在已知路径最短的情况下, 在这个基础上求到的未知路径才会是最短的.
 */



// 矩阵数据结构, 表示单向距离,   matrix[0][1]表示 从 0 -> 1的距离为1
const matrix = [
    [0,        1,        12,       Infinity, Infinity, Infinity],
    [Infinity, 0,        9,        3,        Infinity, Infinity],
    [Infinity, Infinity, 0,        Infinity, 5,        Infinity],
    [Infinity, Infinity, 4,        0,        13,       15      ],
    [Infinity, Infinity, Infinity, Infinity, 0,        4       ],
    [Infinity, Infinity, Infinity, Infinity, Infinity, 0       ],
    
];

/**
 * 迪杰斯特拉算法,  求到其他顶点的距离
 * @param {Array[]} matrix 路径矩阵
 * @param {number} index index号顶点
 * @return {number[]} index号顶点求到其他顶点的距离
 */
function dijkstra(matrix, index){
    const m = matrix && matrix.length
    const n = m && matrix[0].length
    
    if(!m || !n || index < 0  || index > m) throw new Error('参数错误')

    // step1 & step2 设置集合
    const flag = Array(n).fill(false)       // 标记各个点到index的距离是否已经确定
    const dis = matrix[index].slice()
    flag[index] = true
    
    // step3 松弛   dis[w] = min(dis[v] + matrix[v][w], dis[w])
    let min, minIndex;
    for (let i = 0; i < n; i++) {
        min = Infinity
        // 在一堆估计值点(!flag[j])中,找出最近的点, 则可以认为它也能确定为路径最短的点
        for (let j = 0; j < n; j++) {
            if (!flag[j] && dis[j] < min) {
                min = dis[j]
                minIndex = j
            }
        }
        flag[minIndex] = true

        // 根据新确定的点, 对边进行松弛操作, 给dis数组设置距离
        for (let k = 0; k < n; k++) {
            if (matrix[minIndex][k] != Infinity) {
                dis[k] = Math.min(dis[minIndex] + matrix[minIndex][k], dis[k])
            }
        }
    }

    return dis
}

dijkstra(matrix, 0) // [0, 1, 8, 4, 13, 17]