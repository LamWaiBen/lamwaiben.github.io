// AST遍历器

/**
 * 
 * @param {*} ast LISP 风格的AST
 * @param {*} visitor transformer(LISP -> JS)
 * 
 * @return 返回
 *  {
 *      → Program (enter)
            → CallExpression (enter)
                → NumberLiteral (enter)
                ← NumberLiteral (exit)
                → CallExpression (enter)
                    → NumberLiteral (enter)
                    ← NumberLiteral (exit)
                    → NumberLiteral (enter)
                    ← NumberLiteral (exit)
                ← CallExpression (exit)
            ← CallExpression (exit)
        ← Program (exit)
 *  }
 */
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

module.exports = traverser;