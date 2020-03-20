'use strict';
(function () {
    const root = (typeof window === 'object' && window) ||
        (typeof global === 'object' && global) ||
        this;

    class EventEmitter {
        constructor() {
            this._events = new Map();
        }

        /**
         * 
         * @param {any} event   事件
         * @param {Function|Object} listener 监听器函数
         */
        on(event, listener) {
            if (!event || !listener) return this;
            if (!isValidListener(listener)) throw new TypeError('listener must be a function!');

            const listeners = this._events.get(event) || [];
            const isWrapped = typeof listener == 'object';

            // 不重复添加监听器函数
            if (!listeners.includes(isWrapped ? listener.listener : listener)) {
                listeners.push(isWrapped ? listener : { listener, once: false });
                this._events.set(event, listeners);
            };

            return this;
        }

        emit(event, args = []) {
            let listeners = this._events.get(event);
            if (!listeners) return this;

            for (let i = 0; i < listeners.length; i++) {
                let { listener, once = false } = listeners[i]
                listener.apply(this, args)
                once && this.off(event, listener)
            };
            return this;
        }

        /**
         * 删除事件
         * @param {*} event 
         * @param {*} listener 
         */
        off(event, listener) {
            const listeners = this._events.get(event)
            if (!listeners) return this

            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i] && listeners[i].listener === listener) {
                    listeners.splice(i, 1)
                    break;
                }
            }

            return this;
        }

        once(event, listener) {
            return this.on(event, { listener, once: true });
        }

        allOff(event) {
            this._events.delete(event);
            return this;
        }
    };

    function isValidListener(listener) {
        if (typeof listener === 'function') return true;
        else if (listener && typeof listener === 'object') return isValidListener(listener.listener);
        return false;
    }

    // 考虑dom节点, 需要排除存在id #exports 或 #module 的情况, 
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = EventEmitter;
        }
        exports.EventEmitter = EventEmitter;
    } else {
        root.EventEmitter = EventEmitter;
    }
})();