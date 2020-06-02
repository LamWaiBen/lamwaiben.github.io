# 用JS实现一个编译器

##  编译器是什么?
编译器的主要工作是把人类可读的代码, 经过编译器翻译成机器可读的代码.  

根据编译的时机, 可以分为两类编译器:  
1. 静态编译(AOT, Ahead-Of-Time)
    静态编译会在程序运行前, 使用编译器将所有代码编译成机器码.
2. 动态编译(JIT, Just-In-Time)
    动态编译, 使用编译器一遍编译一遍执行程序, 运行到哪里, 编译到哪里.

大多数现代编译器的工作流程基本都包括以下三个阶段:  
1. `「解析（Parsing）」` ：通过`词法分析`和`语法分析`，将原始代码字符串解析成「抽象语法树（Abstract Syntax Tree）」；
2. `「转换（Transformation）」`：对抽象语法树进行转换处理操作；
3. `「生成代码（Code Generation）」`：将转换之后的 AST 对象生成目标语言代码字符串。

## 使用js实现一个Lisp风格的编译器
为了加强对编译器机制的理解, 准备通过使用js实现一个将Lisp风格的代码, 编译成js代码, 然后在js引擎中运行的编译器.  
```
                LISP-style	                Javascript-style
2 + 2	        (add 2 2)	                add(2, 2)
4 - 2	        (subtract 4 2)	            subtract(4, 2)
2 + (4 - 2)	    (add 2 (subtract 4 2))      add(2, subtract(4, 2))
```

### 入口
编译器需要有一个入口, 用来传入我们需要编译的代码, 且返回js引擎可运行的代码.  
入口把编译分为四个阶段:  
1. 词法分析
2. 语法分析
3. 转译AST树
4. 输出目标代码
```javascript 
function compiler(input) {
    let tokens = tokenizer(input)           // 词法分析
    let ast = parser(tokens)                // 语法分析
    let newAst = transformer(ast)           // 转译成目标代码的语法树
    let output = codeGenerator(newAst)      // 翻译成目标代码
    return output
}
```
本文例子以 `(add 2 (subtract 4 2))` 为例, 输出: `add(2, subtract(4, 2))`

### 词法分析

阶段目标: 把输入的代码根据`词法规则`分析, 得到类似于下面的tokens: 
```javascript
[
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'add'      },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'subtract' },
  { type: 'number', value: '4'        },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: ')'        },
  { type: 'paren',  value: ')'        },
]
```

### 语法分析
语法分析阶段需要根据`特定的语法将词法分析返回的tokens, 将每一个词赋予语义, 翻译成抽象语法树, 得到类似于下面的内容:
```javascript
{
  type: 'Program',
  body: [{
    type: 'CallExpression',     // 调用表达式 
    name: 'add',
    params: [{
      type: 'NumberLiteral',    // 数值字面量
      value: '2',
    }, {
      type: 'CallExpression',   // 调用表达式
      name: 'subtract',
      params: [{
        type: 'NumberLiteral',
        value: '4',
      }, {
        type: 'NumberLiteral',
        value: '2',
      }]
    }]
  }]
}
```   

AST名词术语:
- 变量声明(VariableDeclaration)
  - 标示符(Identifier)
  - 字面量(NumberLiteral)
- 函数声明(FunctionDeclaration)
  - 标示符
  - 参数(params)
  - generator/async...
  - body: BlockStatement
    - 语句块(BlockStatement)
      - body[]
- 表达式语句(ExpressionStatement)
  - 调用表达式(CallExpression)
    - 被调用函数(callee)
    - 实参(arguments)
  - 成员表达式(MemberExpression)
    - object
    - property
  - 赋值表达式(AssignmentExpression)
    - left
    - right
  - 对象表达式(ObjectExpression)
    - ObjectProperty
      - key
      - value
    - ObjectMethod
      - 类型(kind) method/get/set
      - like-FunctionDeclaration
- 
### 转译AST树
1. 为了方便将 `LISP风格的AST` 转译成与JS引擎相适应的AST, 我们将会定义一个遍历器`traverser`方法, 用来处理每一个节点的操作.
    ```javascript
    function traverser(ast, visitor) {
        return traverseNode(ast, null)

        function traverseNode(node, parent) {
            // 触发入栈, 生成相应的节点数据
            let method = visitor[node.type]
            if (method && method.enter) {
                method.enter(node, parent)
            }

            // 节点类型不同, 需要遍历的子节点也不一样
            switch (node.type) {
                case "Program":
                    traverseArray(node.body, node);
                    break;
                case 'CallExpression': 
                    traverseArray(node.params, node); 
                    break;      
                // 数值和字符串，忽略      
                case 'NumberLiteral':      
                case 'StringLiteral':        
                    break;
                default:
                    throw new TypeError(node.type)
            }
        }

        function traverseArray(array, parent) {
            array.forEach(child => {
                traverseNode(child, parent);
            });
        }
    }
    ```
2. 转译器`transformer`  
   根据节点的类型, 入栈时创造不同的上下文.
    ```javascript
    const targetAST = {
        type: 'Program',
        body: []
    };

    // 通过 _context 维护新旧 AST，注意 _context 是一个引用，从旧的 AST 到新的 AST。
    ast._context = targetAST.body

    const vistor = {
        NumberLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value
                })
            }
        },

        StringLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'StringLiteral',
                    value: node.value
                })
            }
        },

        CallExpression: {
            enter(node, parent) {
                let expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name,
                    },
                    arguments: [],
                }

                node._context = expression.arguments
                
                // 判断是否为顶层调用函数
                if (parent.type !== 'CallExpression') {
                    expression = {
                        type: 'ExpressionStatement',
                        expression: expression
                    }
                }

                parent._context.push(expression)
            }
        }
    }
    traverser(ast, vistor)


    return targetAST;

    ```

### 生成代码
通过递归，将新的 `AST` 对象代码重新拼接, 转换成 JavaScript 可执行代码字符串.



## 参考资料
- [The Super Tiny Compiler](https://the-super-tiny-compiler.glitch.me/)