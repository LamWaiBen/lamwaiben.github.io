/**
 * 字符串
 * 
 */

/**
 * KMP算法
 * 核心: 避免不必要的回溯算法, 根据模式串控制从哪里开始匹配(next数组)
 * 模式串: 
 *     1. 内部无重复部分, 直接在父串失配处开始模式串重头匹配
 *     2. 内部有重复部分, 判断重复部分时候等于父串的部分, 若是则从用模式串不匹配的地方去匹配
 * 总结: 计算模式串 重复的地方, 每一个字符标记上k值(若该字符发生不匹配时, 模式串从k值开始去匹配父串) next数组的值: 前缀的长度 + 1
 */

function kmp(s1, s2) {
    const next = getNext(s2)

    let i = 0, j = 0;
    while(i < s1.length && j < s2.length) {
        if(s1[i] === s2[j]){
            i++
            j++
        } else {
            if(next[j] != j) {
                j = next[j]
            } else {
                i++
                j = 0
            }
        }
    }

    if(j >= s2.length) {
        return i - s2.length
    }
    return 0
}

function getNext(s) {
    let next = [-1]     // -1 与 0 等价, 都是表示从第一个字符开始
    let len = s.length
    let i = 0        // 后缀
    let j = -1       // 前缀
    while (i < len) {
        // console.log(i, j, next)
        if (j == - 1 || s[i] == s[j]) {
            j++
            i++
            next[i] = j
        } else {
            j = next[j]
        }
    }
    next[0] = 0
    return next
}

// 优化版 
function getStrNext(str){
    let next = [-1];
    let i = 0, j = -1;
    while(i < str.length) {
        if(j === -1 || str[i] === str[j]) {
            i++
            j++
            if(str[i] != str[j]){
                next[i] = j
            } else {
                next[i] = next[j]
            }
        } else {
            j = next[j]
        }
    }
    
    next = next.map(v => v < 0 ? 0 : v)
    return next
}

// console.log(getNext('abcabcdaa'))
console.log(getNext('ababaaaba')) // [ 0, 0, 0, 1, 2, 3, 1, 1, 2, 3 ]
console.log(getStrNext('aaaaab')) // [ 0, 0, 1, 2, 3, 4, 0 ]

console.log(kmp('abcdefgafgb', 'gb'))
