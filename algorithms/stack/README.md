## Stack
栈结构常用于处理:
1. 符号闭合问题(括号, AST的编译)
2. 单调递增栈  


代码模板
```javascript
// 单调递减栈模板
function decStackTemplate(arr){
    const stack = [arr[0]]
    for(let i = 1; i < arr.length; i++) {
        // 当新元素比栈顶元素大的时候, 需要先出栈
        while(stack.length > 0 && stack[stack.length - 1] < arr[i]) {
            const cur = stack.pop()
            // do something  cur & arr[i]
        }
        stack.push(arr[i])
    }
}

```

### leetcode
#### 单调递增/减栈
- 42. 接雨水
- 84. 柱状图中最大的矩形
- 496. 下一个更大元素