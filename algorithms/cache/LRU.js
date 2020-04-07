/**
 * 缓存算法
 * Least Recently Used      最近最少使用
 */

function LRU(maxLen) {
    if(maxLen <= 0) throw('illegal length')
    let max = maxLen
    let cache = {}
    let keys = []       // 数组模拟链表, 前面表示最近使用, 后方表示要淘汰的缓存

    return {
        get(key) {
            let data = cache[key]
            if (data) {
                // 缓存命中时, 把缓存移到链表前方
                this.move(key, data)
            }
            return data || null
        },

        set(key, data) {
            this.move(key, data)

            if (keys.length > max) {
                let lastKey = keys[max]
                this.delete(lastKey)
            }
        },

        delete(key) {
            let index = keys.findIndex(v => v === key)
            Reflect.deleteProperty(cache, keys[index])
            return keys.splice(index, 1)
        },

        move(key, data) {
            let index = keys.findIndex(v => v === key)
            if(~index != 0) {
                keys.splice(index, 1)
            }
            keys.unshift(key)
            cache[key] = data
        },

        empty(){
            keys.length = 0
            cache = {}
        }
    }
}
