# BEM 规范

## 什么是 BEM 规范

BEM 规范是在为元素进行 css 命名时的一种命名规范, 具体规范就是: **_ block-name\_\_element-name--modifier-name _**
即: 模块名\_\_元素名--修饰器名

在命名的时候遵循几个思想:

1. 组件内的所有元素命名都需要加上模块名
2. BEM 命名中只能包含一个元素, 不能出现多个元素名
3. BEM 是不考虑结构的, 在命名期间不需要考虑元素的父元素是什么, 所以几遍修改了元素结构也不会影响效果
4. BEM 禁止使用子选择器, 因为子选择器可能会导致层次关系过长, 逻辑不清晰, 增加耦合度

通过上面的几个核心思想, 元素的标识是唯一的, 从而保证样式不冲突

eg:

```css
<div class="page-btn">
    <button type="button" class="page-btn__prev">上一页</button>
    <!-- ... -->
    <button type="button" class="page-btn__next">下一页</button>
</div>
```

当然 BEM 自身也会存在一些问题:

- 命名过长
  解决方案: 使用 css-loader 的 placeholder 功能, 把繁琐的模块名前缀交由程序实现
