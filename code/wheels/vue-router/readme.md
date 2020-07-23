## Router

1. install method  => Vue.use(Router)   => Router.prototype.init()
2. init
   1. listen url change event (hash/history)
   2. parse path  =>  match routerMap => update view
   3. define global component


### hash

##### browser api

1. window.onhashchange
2. window.location.hash

### history

##### browser api

1. window.onpopstate
2. window.history.replaceState(state, title, url)
3. window.history.pushState(state, title, url)

##### notice

work with backend's redirect when refresh or url-visited



### common

1. async load

   ```javascript
   // require
   component: resolve=>(require(['@/components/HelloWorld'],resolve))
   
   // import
   component: () => import('@/components/HelloWorld')
   
   ```

   

2. hook