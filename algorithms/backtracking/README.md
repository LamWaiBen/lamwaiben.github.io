## 回溯
思路: 在暴力解法的基础上, 遇到不适合的选择就退回上一步, 通过约束条件剪枝, 达到减少时间复杂度的效果.
```javascript
// 代码框架
function backtrack(res, len, list, nums){
    if(list.length === len){
        res.push([...list])
        return
    }
    
    // 做当前范围内的允许的选择, 然后撤回
    for(let i = 0; i < nums.length; i++) {
        list.push(nums[i])
        backtrack(res, len + 1, list, nums)
        list.pop()
    }
}

```
### leetcode
- 40. 组合总和 II
- 46. 全排列
- 47. 全排列 II
- 78. 子集
- 90. 子集 II