const { enhance } = require('./util')
module.exports = {
    bindPushState(cb){
        window.history['pushState'] = enhance(window.history, 'pushState')
        window.addEventListener('pushstate', cb)
    },

    bindReplaceState(cb) {
        window.history['replaceState'] = enhance(window.history, 'replaceState')
        window.addEventListener('replaceState', cb)
    },

    bindUrlChange(cb){
        window
    },

    bindPopState(cb) {
        window.add
    }
}