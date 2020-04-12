'use strict';
(function () {
    var root = (typeof self === 'object' && self.self === self && self) ||
        (typeof global === 'object' && global.global === global && global) ||
        this || {};

    // 兼容性处理, 准备一些函数
    // raf(requestAnimationFrame) 兼容至IE6
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (cb) {
            var currTime = new Date().getTime()
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
            var nextCallTime = timeToCall + timeToCall
            var id = setTimeout(function () {
                cb(nextCallTime)
            }, timeToCall)
            lastTime = nextCallTime
            return id
        }
    };

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) { this.clearTimeout(id) };
    }

    if (!Function.prototype.bind) {
        Function.prototype.bind = function (ctx) {
            if (typeof this != "function") throw new TypeError("bind must be called on a function")
            var func = this
            var bindArgs = Array.prototype.slice.call(arguments, 1);

            var fNOP = function () { }
            var fBound = function () {
                var args = bindArgs.concat(arguments)
                return func.apply(this instanceof fNOP ? this : ctx, args)
            }

            fNOP = this.prototype
            fBound.prototype = new fNOP()
            return fBound
        }
    }

    var utils = {
        extend: function (target) {
            for (var i = 1, len = arguments.length; i < len; i++) {
                for (var prop in arguments[i]) {
                    if (arguments[i].hasOwnProperty(prop)) {
                        target[prop] = arguments[i][prop]
                    }
                }
            }
            return target
        },
        addEvent: function (element, type, fn) {
            if (document.addEventListener) {
                element.addEventListener(type, fn, false)
                return fn
            } else if (document.attachEvent) {
                var bound = fn.bind(element)
                element.attachEvent('on' + type, bound)
                return bound
            }
        },
        indexOf: function (array, item) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] == item) {
                    return i
                }
            }
            return -1
        },

        getViewPortSizeHeight: function () {
            var w = window;
            if (w.innerWidth != null) return w.innerHeight;

            var d = w.document;
            //  表明是标准模式
            if (document.compatMode == 'CSS1Compat') {
                return d.documentElement.clientHeight;
            }

            // 怪异模式
            return d.body.clientHeight;
        },

        getScrollOffsetsTop: function () {
            var w = window;
            if (w.pageXOffset != null) return w.pageYOffset;

            var d = w.document
            if(document.compatMode == 'CSS1Compat') {
                return d.documentElement.scrollTop;
            }

            return d.body.scrollTop
        },
    }

    function EventEmit() {
        this._events = {}
    }

    var evProto = EventEmit.prototype

    evProto.on = function (eventName, cb, isOnce) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        };

        var listeners = this._events[eventName];
        if (utils.indexOf(listeners, cb) == -1) {
            this._events[eventName].push({
                cb: cb,
                isOnce: !!isOnce,
            });
        }
        return this;
    }

    evProto.once = function (eventName, cb) {
        this.on(eventName, cb, true);
        return this;
    }

    evProto.emit = function (eventName, params) {
        var listeners = this._events[eventName];
        if (!listeners) return;
        for (var i = 0; i < listeners.length; i++) {
            var cb = listeners[i].cb;
            cb(params);
            if (listeners[i].isOnce) {
                this.off(eventName, cb);
                i--;
            }
        };

        return this;
    }

    evProto.off = function (eventName, cb) {
        var listeners = this._events[eventName];
        if (listeners) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i] && listeners[i].cb === cb) {
                    listeners.splice(i, 1);
                    i--;
                };
            };
        };
        return this;
    }

    ScrollIndicator.defaultOptions = {
        color: "#0A74DA"
    }

    function ScrollIndicator(options) {
        this.options = utils.extend({}, this.constructor.defaultOptions, options);
        this.init();
    }

    var proto = ScrollIndicator.prototype = new EventEmit()
    proto.constructor = ScrollIndicator

    proto.init = function () {
        this.createIndicator()
        this.setWidth(this.calculateWidthPrecent())
        this.bindScrollEvent()
    }

    proto.createIndicator = function () {
        var div = document.createElement('div');
        div.id = 'progress-indicator';
        div.class = 'progress-indicator';
        
        div.style.position = "fixed";
        div.style.top = 0;
        div.style.left = 0;
        div.style.height = '3px';

        div.style.backgroundColor = this.options.color;
        this.ele = div;

        document.body.appendChild(div);
    }

    proto.calculateWidthPrecent = function () {
        // 文档高度
        this.docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);

        // 视口高度
        this.viewPortHeight = utils.getViewPortSizeHeight();

        // 差值
        this.sHeight = Math.max(this.docHeight - this.viewPortHeight, 0);

        var scrollTop = utils.getScrollOffsetsTop();

        return this.sHeight ? scrollTop / this.sHeight : 0;

    }

    proto.setWidth = function (progress) {
        this.ele.style.width = progress * 100 + "%";
    }
    
    proto.bindScrollEvent = function () {
        var self = this;
        var prev;
        utils.addEvent(window, 'scroll', function () {
            window.requestAnimationFrame(function () {
                var perc = Math.min(utils.getScrollOffsetsTop() / self.sHeight, 1);
                // 火狐中有可能连续计算为 1，导致 end 事件被触发两次
                if (perc == prev) return;
                // 在达到 100% 的时候，刷新页面不 emit end 事件
                if (prev && perc == 1) {
                    self.emit("end")
                }
    
                prev = perc;
                self.setWidth(perc);
            })
        })
    }




    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = ScrollIndicator;
        }

        exports.ScrollIndicator = ScrollIndicator;
    } else {
        root.ScrollIndicator = ScrollIndicator;
    }


})()