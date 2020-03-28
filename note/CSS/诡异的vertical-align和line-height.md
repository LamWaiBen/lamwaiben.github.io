# 诡异的 vertical-align 和 line-height 
## 属性之间的赋值关系  
    前置知识:  
    - `line-height`的数字值是和当前元素的`font-size`大小相关的  
    - `vertical-align`的百分比值是和当前元素的`line-height`值相关的  

    在CSS中其高度作用的只有`height`和`line-height`两个属性. 如果一个元素没有设置`height`那么其最终的高度一定是由`line-height`决定的, 而`line-height` 没有设置的时候又是由`font-size`决定的且同时`line-height`又会决定`vertical-align`的值.
    所以它们的默认值关系如下:   
    > font-size -> line-height -> vertical-align  
    > font-size -> line-height -> 可视高度

## 幽灵空白节点  
    在HTML5文档声明下，块状元素内部的内联元素的行为表现，就好像块状元素内部还有一个（更有可能两个-前后）看不见摸不着没有宽度没有实体的空白节点，这个假想又似乎存在的空白节点，我称之为`“幽灵空白节点”`

    ```html
    <div class="test">
        <img src="//www.baidu.com/img/bd_logo1.png" alt="">
        <span>Xx度娘下方有一块空白的东西, 在dom上看不到"幽灵空白节点"的存在</span>
    </div>
    .test {
        background: red;
    }
    img {
        width: 50px;
        height: 50px;
    }
    span {
        background: white;
    }
    ```
## 怎么控制修改幽灵空白节点
   1. 想要修改空白节点, 首先要搞清楚它的机制是怎么样的
      - 产生机制是什么?  
       `vertical-align` 的默认值是 `baseline` , 也就是使元素的基线与`父元素的基线对齐`. 基线: 字母X的下边缘. 也就是说`图片与字符X的下边缘对其, 而字符自身也有高度`, 所以会把IFC撑开, 导致幽灵节点的产生.
      - 受哪些因素控制?  
        从产生机制可以知道幽灵节点的高度和字符高度有关, 字符的高度只有一个属性可以直接设置, 就是`line-height 行高`.
    1. 控制方案  
        从空白节点的机制可以知道, 幽灵空白节点的产生是因为`IFC`布局时, inline容器的高度受`vertical-align`和 `line-height`相互作用而产生变化.   
        `vertical-align`选择对齐的位置不同, 会导致高度较小其他元素的排布也不一样, 从而会使其他高度较小的元素也会影响到inline容器的高度. 所以可以通过修改`vertical-align`和`line-height`来控制甚至利用幽灵空白节点.
        1. `使vertical-align失效`  
            vertical-align是只作用于inline元素, 所以可以把图片设置为 display: block.
            ```css
            img { display: block; }
            ```
        2. 使用其他vertical-align值  
            vertical-align的默认值是baseline,  当字符高度小于图片高度时, 可以通过修改对齐标准, 使字符的高度不会撑开IFC的高度. 可以参考的属性有:  
            - text-top 
              使元素的顶部与父元素的字体顶部对齐
            - text-bottom 
              使元素的底部与父元素的字体底部对齐
            - middle 
              使元素的中部与父元素的基线加上父元素x-height的一半对齐。
            - top 
              使元素及其后代元素的顶部与`整行`的顶部对齐
            - bottom 
              使元素及其后代元素的底部与`整行`的底部对齐  
            
            ps: 没有基线的元素，使用外边距的下边缘替代。(会导致奇特的现象, IFC内有无元素又会导致他们的父元素高度不一样, 简直不要太复杂!!)
        3. 修改父元素的line-height值
            baseline是与父元素的基线对齐, 可以通过修改父元素的line-height: 0, 使子元素也被继承这个属性, 使字符X的高度变小, 则不会超出图片高度
            ```css
            .test { line-height: 0; }
            ``` 
        5. line-height为相对单位，font-size间接控制  
            因为line-height默认是与font-size相关的, 除了直接修改line-height之外, 还可以修改父元素的font-size来间接控制
            ```css  
            div { font-size: 0; }
            ```
    2. 垂直对称 
        弄清楚了vertical-align和line-height的关系之后, 我们可以利用它来实现IFC的垂直居中.
        ```css
        .test {
            line-height: 100px;
        }
        img {
            vertical-align: middle;
        }
        ```

## demo示例
[IFC_vertical-align和line-height.html](./demo/IFC_vertical-align和line-height.html)

## 参考文章
- [CSS深入理解vertical-align和line-height的基友关系](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)