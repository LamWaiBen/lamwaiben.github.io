function codeGenerator(node) {
    switch (node.type) {
        // 程序入口,  自动换行
        case 'Program':
            return node.body.map(codeGenerator).join('\n');
        
        // 顶层表达式, 自动补充分号
        case 'ExpressionStatement':
            return codeGenerator(node.expression) + ';';

        // 函数调用, 参数以逗号分隔
        // 函数名 + ( + 参数1, 参数2... + )
        case 'CallExpression': 
            return (
                codeGenerator(node.callee) + 
                '(' + node.arguments.map(codeGenerator).join(',') + ')'
            );
        
        // 标示符
        case 'Identifier':
            return node.name;
            
        // 数字字面量
        case 'NumberLiteral':
            return node.value;
        
        // 字符串字面量
        case 'StringLiteral': 
            return '"' + node.value + '"';
        default:
            throw new TypeError(node.type)
    }
};


module.exports = codeGenerator;