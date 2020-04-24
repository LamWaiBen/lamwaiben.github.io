# Vue的响应式原理

## 数据劫持
- 如何避免重复劫持
  - 给把obsever 设置为 __ob__ 属性, 通过此属性判断是否已经劫持过
- 如何劫持数组
  - 改造原数组方法, 监听数组类型数据时, 替换其原型
  - 提供Vue.$set(o, key, val)方法
  - 当判断到为嵌套数组时递归劫持和收集依赖
## 依赖收集  
一个vm实例只有一个watcher实例  new Watcher(vm, render, cb).  

### 流程:  
1. watcher实例化的时候会触发render函数, Dep.target = watcher
2. render函数中被劫持的数据会触发闭包 dep.depend()
3. dep.subs.push(Dep.target) dep 成功收集到该数据的watcher
4. Dep.target.deps.push(dep) watcher 成功收集该数据的 dep
5. 当数据setter触发时,  dep.notify()执行, 就可以遍历执行watcher.cb, 从而推动视图更新 

### 存在的问题
- 如何避免重复依赖  
  - 给 dep 设置id, 当watcher判断已经有这个数据的dep时, 则忽略

- 计算属性
  - 无cb参数的watcher实例的值:  
    vm.computed\[key\] = new Watcher(vm, () => a + b).get()