function parser(tokens) {
    let ast = {
        type: 'Program',
        body: [],
    };

    let current = 0;

    while (current < tokens.length) {
        ast.body.push(walk());
    };
    return ast;

    function walk() {
        let token = tokens[current];
        if (token.type === 'number') {
            current++;
            return {
                type: 'NumberLiteral',
                value: token.value,
            };
        }
        if (token.type === 'string') {
            current++;
            return {
                type: 'StringLiteral',
                value: token.value,
            };
        }

        if (token.type === 'paren' && token.value === '(') {
            token = tokens[++current];
            let node = {
                type: 'CallExpression',
                name: token.value,
                params: [],
            };

            token = tokens[++current];

            // 不满足闭合的情况下一直递归
            while (!(token.type === 'paren' && token.value === ')')) {
                node.params.push(walk());
                token = tokens[current];
            };

            current++;
            return node;
        }

        throw new TypeError(token.type);
    }

};


module.exports = parser;