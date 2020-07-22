## Router

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