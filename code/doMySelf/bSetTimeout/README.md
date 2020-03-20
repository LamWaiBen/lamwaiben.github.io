# 自己实现定时器
借助浏览器环境下的`window.requestAnimationFrame`实现setTimeout/setInterval

## requestAnimationFrame
告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行.
1. 回调函数执行次数通常是每秒60次
2. 当`requestAnimationFrame`运行在后台标签页或者隐藏的\< iframe >中时, requestAnimationFrame会被暂停调用
> [MDN-requestAnimationFrame
](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)


## 分析
1. `setTimeout`内部需要一个时间来判断是否已经达到指定的时间
2. 由于需要实现`clearTimeout`的功能, 所以`setTimeout`需要返回一个id,能通过该id找到对应的定时器,且可以通过这个id把定时器取消
3. 由于`setInterval`是可以通过`setTimeout`实现的，所以我们只要实现了`setTimeout`, 然后在它的基础上实现`setInterval`即可



## 思考
1. 如何实现`clearTimeout`？
    > 设置Timeout时返回id, 并把id作为定时器回调的key放在闭包中. 执行clearTimeout时对闭包操作.
2. 如何通过`setTimeout`实现`setInterval`?
    > 在setTimeout的回调里面再设置setTimeout.



## 别人的实现
1. [ref-timeout](./raf-timeout.js)