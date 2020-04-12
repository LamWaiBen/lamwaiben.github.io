# BFC

## 常见的三种定位方案
定位方案是控制元素的布局
- 普通流: 至上而下布局, 当前行占满后换下一行
- 浮动: 根据浮动方向尽可能向左或向右, 可以产生文字环绕的效果
- 绝对定位: 元素会脱离文档流, 所以绝对定位的元素不会对其他兄弟元素影响

## BFC的概念
浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为"visiable"的块级盒子，都会为他们的内容创建新的BFC（Block Fromatting Context， 即块级格式上下文.  

BFC属于上述的普通流定位方案.  
## BFC如何产生

只要元素满足以下任一条件即可触发BFC:
- body根元素
- 浮动元素: float除`none`以外的值
- 绝对定位元素: position的值为(`absolute, fixed`)
- display为 `inline-block, table-cells, flex`等非块级盒子的块级容器
- overflow除visible以外的值(`hidden, auto, scroll`)的块级元素


## BFC的特性
1. BFC是一个独立的容器, 内外部的元素不会影响
2. 同一个BFC下的元素外边距会发生折叠
3. BFC内的浮动元素也参与高度计算
4. BFC的区域不会与浮动元素的区域重叠


## BFC的应用
1. 防止浮动导致的父元素高度坍塌
2. 避免外边距折叠