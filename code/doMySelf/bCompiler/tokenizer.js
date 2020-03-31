function tokenizer(input) {
    let tokens = [];
    let current = 0;

    while (current < input.length) {
        let char = input[current];

        // 判断 括号词法
        // 记录当前括号的值
        if (char === '(' || char === ')') {
            tokens.push({
                type: 'paren',
                value: char,
            });
            current++;
            continue;
        }

        // 判断 空格词法
        // 空格时 不需要做任何处理
        let WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        // 判断数字, 
        // 需要考虑数字的完整性
        //   (add 123 456)
        //        ^^^ ^^^
        //        两个独立的token
        //
        let NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {
            let value = '';
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({
                type: 'number',
                value,
            })
            continue;
        }

        // 判断 字符串
        // 字符串特征: 被单引号/双引号包裹
        if(char === '"' || char === "'") {
            let QUOTE = char === "'" ? "'" : '"';
            let value = '';

            char = input[++current]
            while (char != QUOTE) {
                value += char
                char = input[++current]
            }

            tokens.push({
                type: 'string',
                value,
            })
            continue
        }

        // 判断 函数变量
        // 
        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            let value = '';
            while (LETTERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'name', value });
            continue;
        }

        // 判断非法词法
        throw new TypeError('I dont know what this character is: ' + char);
    }

    return tokens;
};
module.exports = tokenizer;
