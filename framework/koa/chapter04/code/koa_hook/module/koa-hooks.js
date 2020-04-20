// const hooks = require('hooks')
class ApiHooks {
    constructor(ctx, next, cb) {
        this._ctx = ctx
        this._next = next
        this._cb = cb
        // this._listenerTree = {}
        // this.addListenerTree()
    }
    addListenerTree() {
        // for (let fn in hooks) {
        //     this[fn] = hooks[fn]
        // }
    }
    addHooks(listeners) {
        const self = this
        try {
            listeners.map(listener => {
                const [method, hooksFn] = listener.split('.')
                if (hooksFn.match('before')) self.addFn(method, hooksFn, 'pre')
                if (hooksFn.match('after')) self.addFn(method, hooksFn, 'post')
            })
        } catch (err) {
            console.log('err:', err)
        }
    }
    // addFn(method, hooksFn, hook) {
    //     const self = this
    //     self[hook](method, async (next) => {
    //         await self[hooksFn](self._ctx, next, self._cb)
    //     })
    // }

    pre(methodName, hookFn) {
        let oldMethod = this[methodName]
        this[methodName] = async (ctx, next, cb) => {
            await hookFn(next)
            await oldMethod(ctx, next, cb)
        }
    }

    post(methodName, hookFn) {
        let oldMethod = this[methodName]
        this[methodName] = async (ctx, next, cb) => {
            await oldMethod(next)
            await hookFn(ctx, next, cb)
        }
    }

    _addFn(method, hooksFn, hook) {
        this[hook](method, async (next) => {
            await this[hooksFn](this._ctx, next, this._cb)
        })
    }
}
module.exports = ApiHooks