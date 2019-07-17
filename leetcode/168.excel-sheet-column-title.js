/*
 * @lc app=leetcode id=168 lang=javascript
 *
 * [168] Excel Sheet Column Title
 */
/**
 * @param {number} n
 * @return {string}
 */
var convertToTitle = function(n) {
    let i = "A".charCodeAt()
    let j = 'Z'.charCodeAt()
    let scale = j - i + 1
    // 0-9         10
    // A-Z         26   27 AA

    let str = ""
    let rest = n % scale ? n % scale : scale
    let up = parseInt((n - rest)/ scale)
    if(up > 0) str = convertToTitle(up) + str

    str = str + String.fromCodePoint(rest + i - 1)
    return str
};

