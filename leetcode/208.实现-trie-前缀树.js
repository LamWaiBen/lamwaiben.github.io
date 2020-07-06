/*
 * @lc app=leetcode.cn id=208 lang=javascript
 *
 * [208] 实现 Trie (前缀树)
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
var Trie = function() {
    this.map = new Map()
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let map = this.map
    for(let i = 0 ; i < word.length; i++){
        map.set(word[i].charCodeAt(), map = (map.get(word[i].charCodeAt()) || new Map()))
    }
    map.set('isEnd', true)
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let map = this.map
    for(let i = 0; i < word.length; i++) {
        map = map.get(word[i].charCodeAt());
        if(!map) return false
    }
    return !!map.get('isEnd')
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let map = this.map;
    for (let i = 0; i < prefix.length; i++) {
        map = map.get(prefix[i].charCodeAt());
        if (!map) return false;
    }
    return true
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end

