/**
 * 滑动窗口
 * 题目: 
 * 209. 长度最小的子数组
 * @param {*} str 
 */
function slidingWindow(str) {
    let left = 0, right = 0;
    while (right < s.length) {
        // r: 移入窗口的字符
        let r = str[right]
        // 窗口右移
        right++
        // do logic

        while (true) {  // 满足一定条件, 窗口需要右移
            // l: 移出窗口的字符
            let l = str[left]
            // 窗口右移
            left++
            // do logic

        }
    }
}
