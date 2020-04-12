# CSS

## 选择器
- [选择器介绍及优先级](./选择器.md)

## media 媒体查询
可以在以下几个地方使用:
- link元素的media属性.
- style元素的media属性.
- @import声明的媒体描述符部分.
- @media声明的媒体描述符部分.  

后两种比较常见,
```
# 语法如下(括号表示非必须部分) :
@media (媒体类型) (逻辑关键字) (媒体描述符: 具体值) { /* css属性 */}

@media all|screen|print and|not|only min-width|max-width|min-resolution|... {
    color: yellow;
    ...
}

# 示例: 
@media screen and (max-width: 30em){
    /* 屏幕媒体 且 最大宽度小于30em */
}

@media all not (color) and (mind-device-width: 800){
    /* not 对整个媒体描述符取反, 表示的意思是 当媒体为彩色且设备的屏幕宽度至少为800px像素时样式表 不会 应用, 其余情况均应用 */
}
```

## 兼容性

## 布局机制
### BFC
[BFC的相关知识](./BFC.md)
### IFC
[IFC的相关知识](./IFC.md)
### FFC
Flex formatting context
TODO
### GFC
Grid formatting context
TODO


## 移动端

- [移动端的高清设备方案](https://www.cnblogs.com/superlizhao/p/8729190.html)