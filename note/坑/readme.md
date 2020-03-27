# 踩过的坑
## html
一些浏览器实现的api的怪异行为  
!!document.all   // ie为true, 其他为false  
各厂商的dom默认style不统一  

## css 
不正交  
IFC的 vertical-align  和 line-height  

## JS 
typeof null		// object  
怪异的this行为  
浮点数运算坑 IEEE 574  

## 移动端
retina 的 1px问题  


## nodejs
1. js写法过于灵活, 后期维护问题(其实是js的问题, 可以上ts解决)  
2. 还没有真正的线程(之前都是用进程模拟线程, 不过10以后增加了work_thread)  
3. eventloop的问题容易错(timer -> pending callback -> idle -> poll -> check -> close callback)
4. 有内存限制, 原因是内存占用过高时, 垃圾回收会很慢.(虽然可以人为修改这个限制) 
5. 有一些库(如sqlite3)是别的语言(如C++)编写的需要自己使用node-gyp去编译成node程序, 由于没学过相关东西简直太痛苦!

## 跨平台
移动端跨平台的JS引擎不同导致的一些问题:   
1. 安卓(V8)与ios(JavaScript Core)数组排序方法得到的结果不一致, 原因: 内部使用了快排来实现, 但是快排又是不稳定的算法, 所以不同的内核实现的快排算法又不一致.