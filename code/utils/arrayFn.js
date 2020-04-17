// 返回数组的交集

// 两数组交集
function jiaoji(arr1, arr2) {
    return [...new Set(arr1.filter(v => arr2.includes(v)))]
}

// 多数组交集
function array_intersection(...arrList) {
    return [...new Set(arrList.reduce((acc, cur) => {
        // 拿交集数组和后续数组比较
        return acc.filter(v => cur.includes(v))
    }))]
}


// 数组拍平
if (!Array.prototype.flat) {
    Array.prototype.flat = function () {
        return this.reduce((acc, cur) => {
            return acc.concat(cur instanceof Array ? cur.bflat() : cur)
        }, [])
    }
}


// 数组查找索引
// 抽象复用
function createIndexFinder(dir) {
    return (arr, predicate, thisArg) => {
        let i = dir > 0 ? 0 : arr.length - 1;
        for (; i >= 0 && i < arr.length; i += dir) {
            if (predicate.call(thisArg, arr[i], i, arr)) {
                return i
            }
        }
        return -1
    }
}

function createIndexOfFinder(dir) {
    return (arr, item, idx) => {
        let length = arr.length
        let i = dir > 0 ? 0 : length - 1;
        if (typeof idx === 'number') {
            if (dir > 0) {
                i = idx >= 0 ? idx : Math.max(length + idx, 0)
            } else {
                // -length < idx <= length  有效范围 
                if (idx >= 0) {
                    i = Math.min(idx + 1, length) - 1
                } else {
                    i = idx + length
                }
            }
        }

        for (; i >= 0 && i < arr.length; i += dir) {
            if (item === arr[i]) return i
        }
        return -1
    }
}

// 模仿 findIndex
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate, thisArg) {
        return createIndexFinder(1)(this, predicate, thisArg)
    }
}

// 模仿 findLastIndex
if (!Array.prototype.findLastIndex) {
    Array.prototype.findLastIndex = function (predicate, thisArg) {
        return createIndexFinder(-1)(this, predicate, thisArg)
    }
}


// 模仿 indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchEle, idx) {
        return createIndexOfFinder(1)(this, searchEle, idx)
    }
}
// 模仿 lastIndexOf
if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function (searchEle, idx) {
        return createIndexOfFinder(-1)(this, searchEle, idx)
    }
}