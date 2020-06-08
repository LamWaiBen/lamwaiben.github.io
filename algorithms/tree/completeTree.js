/**
 * 完全二叉树: 除了最后一层节点, 其余层次都是满节点的; 节点从左到右排序
 * 特性: 
 *  1. 可以用数组表示
 *  2. 如果知道一个节点的序号为i,  那么其父节点: arr[i/2], 左子节点: arr[2i], 右子节点: arr[2i + 1]
 * 
 * 可以实现: 最大堆(maxHeap)/最小堆(minHeap)
 */



/**
 * 最小堆
 */
const minHeap = []
function insert(key) {
    minHeap.push(key)
    let i = minHeap.length - 1
    while (i / 2 > 0 && minHeap[i] < minHeap[i/2]) {
        [minHeap[i], minHeap[i/2]] = [minHeap[i/2], minHeap[i]]
        i = i/2
    }
}


/**
 * 求数组的前K个最大值
 */
// 1. 全排序后截取前K个值
// 2. 局部排序, 冒泡排序冒K个泡后, 则得到前K个最大值
// 3. 利用堆(最小堆)算法
//      用前K个元素生成最小堆, K+1的元素去跟堆顶比较, 若比堆顶大, 则替换堆顶元素, 并重新调整堆(维持最小堆的状态)