/**
 * 1. 分析js引擎运行时的逻辑
 * 
 *  {
 *      → Program (enter)
 *           → CallExpression (enter)       调用表达式, 创建执行环境: 上下文, 栈.
 *               → NumberLiteral (enter)
 *               ← NumberLiteral (exit)
 *               → CallExpression (enter)
 *                   → NumberLiteral (enter)
 *                   ← NumberLiteral (exit)
 *                   → NumberLiteral (enter)
 *                   ← NumberLiteral (exit)
 *               ← CallExpression (exit)
 *           ← CallExpression (exit)
 *       ← Program (exit)
 * }
 * 
 * 2. 根据把原来的AST, 转译成JS风格的AST
 * ----------------------------------------------------------------------------
 *   Original AST                     |   Transformed AST
 * ----------------------------------------------------------------------------
 *   {                                |   {
 *     type: 'Program',               |     type: 'Program',
 *     body: [{                       |     body: [{
 *       type: 'CallExpression',      |       type: 'ExpressionStatement',
 *       name: 'add',                 |       expression: {
 *       params: [{                   |         type: 'CallExpression',
 *         type: 'NumberLiteral',     |         callee: {
 *         value: '2'                 |           type: 'Identifier',
 *       }, {                         |           name: 'add'
 *         type: 'CallExpression',    |         },
 *         name: 'subtract',          |         arguments: [{
 *         params: [{                 |           type: 'NumberLiteral',
 *           type: 'NumberLiteral',   |           value: '2'
 *           value: '4'               |         }, {
 *         }, {                       |           type: 'CallExpression',
 *           type: 'NumberLiteral',   |           callee: {
 *           value: '2'               |             type: 'Identifier',
 *         }]                         |             name: 'subtract'
 *       }]                           |           },
 *     }]                             |           arguments: [{
 *   }                                |             type: 'NumberLiteral',
 *                                    |             value: '4'
 * ---------------------------------- |           }, {
 *                                    |             type: 'NumberLiteral',
 *                                    |             value: '2'
 *                                    |           }]
 *  (sorry the other one is longer.)  |         }
 *                                    |       }
 *                                    |     }]
 *                                    |   }
 * ----------------------------------------------------------------------------
 * 
 * @param {*} ast 
 */


const traverser = require('./traverser')
function transformer(ast) {
    const targetAST = {
        type: 'Program',
        body: []
    };

    // 通过 _context 维护新旧 AST，注意 _context 是一个引用，从旧的 AST 到新的 AST。
    ast._context = targetAST.body

    // 根据节点的类型, 入栈时创造不同的上下文.
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
};

module.exports = transformer;