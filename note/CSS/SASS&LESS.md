## SASS 和 LESS

#### /deep/ 的使用
在vue中， 使用第三方组件时，在style scope的时候， 只会对组件的外层dom设置[v-data=xxx]属性， 内部元素并不会设置特殊属性。 而style scope 最终生成的css如下： 
```
.a[data-v-17bb9a05] .b[data-v-17bb9a05]
```
则此时针对第三方组件编写的css属性无法生效， 需要对其使用`/deep/`方能生效