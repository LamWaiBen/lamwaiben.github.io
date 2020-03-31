const tokenizer = require('./tokenizer.js')
const parser = require('./parser.js')
const transformer = require('./transformer.js')
const codeGenerator = require('./codeGenerator.js')

function compiler(input) {
    let tokens = tokenizer(input)           // 词法分析
    let ast = parser(tokens)                // 语法分析
    let newAst = transformer(ast)           // 转译成目标语法树
    let output = codeGenerator(newAst)      // 翻译成目标代码
    return output
}


// test case
// add, subtract 相当于这门语言的内置方法
const add = (a, b) => a + b; 
const subtract = (a, b) => a - b; 
const source = "(add 20 (subtract 4 2))"; 
const target = compiler(source); // => "add(20, (subtract(4, 2));"
const result = eval(target);
console.log(`${source} run result is ${result}`)
