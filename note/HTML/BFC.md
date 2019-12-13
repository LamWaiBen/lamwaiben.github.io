# BFC

## 常见的三种定位方案
定位方案是控制元素的布局
- 普通流: 至上而下布局, 当前行占满后换下一行
- 浮动: 根据浮动方向尽可能向左或向右, 可以产生文字环绕的效果
- 绝对定位: 元素会脱离文档流, 所以绝对定位的元素不会对其他兄弟元素影响

## BFC
BFC即块级格式上下文(Block Formatting Contexts), 属于上述的普通流定位方案.  


## 触发BFC
只要元素满足以下任一条件即可触发BFC:
- body根元素
- 浮动元素: float除`none`以外的值
- 绝对定位元素: position的值为(`absolute, fixed`)
- display为 `inline-block, table-cells, flex`
- overflow除 visible以外的值(`hidden, auto, scroll`)


## BFC的特性与应用

1. 同一个BFC下元素的外边距会发生折叠
2. BFC可以包含住浮动的子元素, 使其不脱离文档流(消除浮动)
3. BFC可以阻止自己的元素被与BFC同一层的浮动元素覆盖(消除文字环绕效果)