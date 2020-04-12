# IFC

## FFC的概念

## FFC如何产生

## FFC的特性

## IFC存在的怪异行为
- [诡异的vertical-align和line-height](./诡异的vertical-align和line-height.md)  

- 两个display:inline-block 元素放在一起为什么会出现一段空白?  
    - 幽灵空白: 空格导致的
    - white-space: normal; 默认值, 把多余的空格合并成一个
    - 方案: 
        1. 标签连写,不使用换行回车/空格
        2. 设置 font-size: 0
        3. 子元素设置浮动