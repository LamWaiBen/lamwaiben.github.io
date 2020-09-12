function lazyLoad(){
    const imgs = document.querySelectorAll('img');

    //用来判断bound.top<=clientHeight的函数，返回一个bool值
    function isIn(el) {
        const bound = el.getBoundingClientRect();   // 返回元素相对于视窗的位置
        const clientHeight = window.innerHeight;
        return bound.top <= clientHeight;
    }
    //检查图片是否在可视区内，如果不在，则加载
    function check() {
        Array.from(imgs).forEach(function (el) {
            if (isIn(el)) {
                loadImg(el);
            }
        });
    }
    function loadImg(el) {
        if (!el.src) {
            const source = el.dataset.src;
            el.src = source;
        }
    }
    window.onload = window.onscroll = function () {
        //onscroll()在滚动条滚动的时候触发
        check();
    };

}


/**
 * 升级版, 借助 Intersection Observer API 
 * 解决了 getBoundingClientRect 触发重排导致的性能问题
 * 参考: 紫云飞 IntersectionObserver API  link: https://www.cnblogs.com/ziyunfei/p/5558712.html
 */


function lazyLoadObserver() {
    const imgs = document.querySelectorAll('img')
    function loadImg(el) {
        if (!el.src) {
            const source = el.dataset.src
            el.src = source
        }
    }

    const options = {
        rootMargin: '300px',
        threshold: [0]
    }

    let observer = new IntersectionObserver((entries, observer) => {
        for (let entry of entries) {
            observer.unobserve(entry.target)
            loadImg(entry.target)
        }
    }, options)

    for(let img of imgs) {
        observer.observe(img)
    }
}