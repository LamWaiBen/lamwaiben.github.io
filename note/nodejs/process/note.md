# process

## process.argv
以数组的形式返回启动命令数据, 以空格划分元素
```
# test.js
console.log(process.argv) 


node test.js -p 123 -q 456 -- name="ben" des='descript'

[
    'C:\\Program Files\\nodejs\\node.exe',
    'test.js',
    '-p',
    '123',
    '-q',
    '456',
    '--',
    'name=ben',             # 省略双引号"
    "des='descript'"        # 可以包含单引号符号
]

```