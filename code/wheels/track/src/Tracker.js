const history = require('./history')

class Tracker {
    constructor() {

        this.init()
    }

    init() {

    }

    /**
     * 客户行为(进入, 退出, 前进后退, 跳转, 切换标签等行为)
     */
    bindCustomEvent() {
        document.addEventListener('load', this.enterHandler.bind(this))
        document.addEventListener('unload', this.exitHandler.bind(this))

        document.addEventListener('load', this.enterHandler.bind(this))
    }

    wr

    enterHandler() {

    }

    exitHandler() {

    }

    urlChangeHandler() {

    }

    activeChangeHandler() {

    }



    /**
     * 浏览器行为(首字节, dom解析, 首屏渲染等)
     */
    bindBrowserEvent() {

    }


    send(){

    }
}

module.exports = Tracker