'use strict';
(function () {
    // 浏览器环境下 self === window   self.self === window
    // node环境下  global.global === global
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global) ||
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
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
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

            fNOP.prototype = this.prototype
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
        getStyle: function (element, prop) {
            return element.currentStyle ? element.currentStyle[prop] : document.defaultView.getComputedStyle(element)[prop]
        },
        getScrollOffsets: function () {
            var w = window
            if (w.pageXOffset != null) return { x: w.pageXOffset, y: w.pageYOffset }
            var d = w.document
            if (document.compatMode == 'CSS1Compat') {
                return {
                    x: d.documentElement.scrollLeft,
                    y: d.documentElement.scrollTop,
                }
            }
            return { x: d.body.scrollLeft, y: d.body.scrollTop }
        },
        setOpacity: function (element, opacity) {
            if (element.style.opacity != undefined) {
                element.style.opacity = opacity / 100
            } else {
                element.style.filter = 'alpah(opacity =' + opacity + ')'
            }
        },
        fadeIn: function (element, speed) {
            var opacity = 0
            utils.setOpacity(element, 0)
            var timer

            function step() {
                utils.setOpacity(element, opacity += speed)
                if (opacity < 100) {
                    timer = requestAnimationFrame(step)
                } else {
                    cancelAnimationFrame(timer)
                }
            }
            requestAnimationFrame(step)
        },
        fadeOut: function (element, speed) {
            var opacity = 100
            utils.setOpacity(element, 100)
            var timer

            function step() {
                utils.setOpacity(element, opacity -= speed)
                if (opacity > 0) {
                    timer = requestAnimationFrame(step)
                } else {
                    cancelAnimationFrame(timer)
                }
            }
            requestAnimationFrame(step)
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
        addClass: function (element, className) {
            var classNames = element.className.split(/\s+/);
            var index = utils.indexOf(classNames, className)
            if (index > -1) {
                classNames.push(className)
            }
            element.className = classNames.join(' ')
        },
        removeClass: function (element, className) {
            var classNames = element.className.split(/\s+/);
            var index = utils.indexOf(classNames, className)
            if (index > -1) {
                classNames.splice(index, 1)
            }
            element.className = classNames.join(' ')
        },
        supportTouch: function () {
            return 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch
        },
        getTime: function () {
            return new Date().getTime()
        }
    }

    var Scrolling_className = "scrolling";

    function ScrollTop(el, options) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        this.options = utils.extend({}, this.constructor.defaultOptions, options)

        this.init()
    }

    ScrollTop.defaultOptions = {
        speed: 100,         // 回到顶部的速度
        showWhen: 100,      // 向下滑动多少出现按钮
        fadeSpeed: 100,     // 按钮淡入淡出的速度
    }

    var proto = ScrollTop.prototype
    proto.init = function () {
        this.hideElement()
        this.bindScrollEvent()
        this.bindToTopEvent()
    }

    proto.hideElement = function () {
        utils.setOpacity(this.el, 0)
        this.status = 'hide'
    }

    proto.bindScrollEvent = function () {
        var self = this
        utils.addEvent(window, 'scroll', function () {
            if (utils.getScrollOffsets().y > self.options.showWhen) {
                if (self.status === 'hide') {
                    utils.fadeIn(self.el, self.options.fadeSpeed)
                    self.status = 'show'
                }
            } else {
                if (self.status === 'show') {
                    utils.fadeOut(self.el, self.options.fadeSpeed)
                    self.status = 'hide'
                    utils.removeClass(self.el, Scrolling_className)
                }
            }
        })
    }

    proto.handleBackTop = function () {
        var self = this, timer
        utils.addClass(self.el, Scrolling_className)
        cancelAnimationFrame(timer)
        timer = requestAnimationFrame(function fn() {
            var oTop = document.body.scrollTop || document.documentElement.scrollTop
            if (oTop > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = oTop - self.options.speed
                requestAnimationFrame(fn)
            } else {
                cancelAnimationFrame(timer)
            }
        })

    }

    proto.bindToTopEvent = function () {
        var self = this
        utils.addEvent(self.el, 'click', self.handleBackTop.bind(self))

        //判断触碰环境下, 是否是触碰导致的误点.
        if (utils.supportTouch()) {
            utils.addEvent(self.el, 'touchstart', e => {
                self._startX = e.touches[0].pageX
                self._startY = e.touches[0].pageY
                self._startTime = utils.getTime()
            })
            utils.addEvent(self.el, 'touchmove', e => {
                self._moveX = e.touches[0].pageX
                self._moveY = e.touches[0].pageY
            })
            utils.addEvent(self.el, 'touchend', e => {
                var endTime = utils.getTime()
                if (self._moveX !== null && Math.abs(self._startX - self._moveX) > 10 ||
                    self._moveY !== null && Math.abs(self._startY - self._moveY) > 10) {

                } else {
                    if (endTime - self._startTime < 500) {
                        self.handleBackTop()
                    }
                }
            })
        }
    }



    // 考虑dom节点, 需要排除存在id #exports 或 #module 的情况, 
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = ScrollTop;
        }
        exports.ScrollTop = ScrollTop;
    } else {
        root.ScrollTop = ScrollTop;
    }
}());