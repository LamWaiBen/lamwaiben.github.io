let Vue;

class Router {
    constructor(options) {
        const self = this
        this.$options = options;
        
        this.$routerMap = {} // {'/': {component: ...}}

        this.$app = new Vue({
            data: {
                current: '/',
            },
            watch: {
                current(newVal, oldVal) {
                    self.triggerHook(newVal, oldVal)
                }
            }
        });
    }

    init() {
        // 1.监听事件
        this.bindEvent();
        // 2. 匹配路由
        this.createRouterMap();
        // 3. 声明全局组件
        this.initComponent();
    }

    bindEvent() {
        if (this.$options.model === 'history') {
            // 仅浏览器前进后退可以触发
            window.addEventListener('hashchange', this.onStateChange.bind(this));
        } else {
            window.addEventListener('hashchange', this.onHashChange.bind(this));
        }
    }

    onHashChange() {
        this.app.current = window.location.hash.slice(1) || '/';
    }

    onStateChange() {
        this.app.current = window.location.pathname
    }

    onReplace(){
        // history: pushState, repalceState
        // hash: hashchange
        // to from   
    }

    triggerHook(toPath, fromPath){

    }

    createRouterMap() {
        this.$options.routes.forEach(v => {
            this.$routerMap[v.path] = v
        })
    }

    initComponent(){
        Vue.component('router-link', {
            props: {
                to: String,
            },
            render(h) {
                h('a', {
                    attrs: {
                        href: '#' + this.to,
                    }
                }, [this.$slots.default])
            }
        })

        Vue.component('router-view', {
            render(h) {
                // 由于 this.$app.current 被观察, render会被依赖收集
                const component = this.$routerMap[this.$app.current].component
                return h(component);
            }
        })
    }

    static install(_vue) {
        Vue = _vue;
        Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    Vue.prototype.$router = this.$options.router;
                    this.$options.router.init();
                }
            },
        });
    }
}
