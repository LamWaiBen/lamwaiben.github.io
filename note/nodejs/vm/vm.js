const vm = require('vm')

const x = 1
const sandbox = {x:2}

// 上下文隔离
let context = vm.createContext(sandbox)

const code = 'x += 40; var y = 17'

/**
 * runInContext
 * code: 被编译和运行的js代码
 * sandbox: 被上下文隔离化过的对象, 会在代码被编译和执行之后充当global对象
 */
vm.runInContext(code, sandbox)
// ps:
// vm.runInNewContext(code, sandbox) 等价于 vm.runInContext(code, vm.createContext(sandbox))


console.log(sandbox)    // {x:42, y:17}

console.log(x)  // 1



/***
 * 使用字节码加密代码
 */
const vm = require('vm');
const CODE = 'console.log("Hello world");'; // 源代码
const script = new vm.Script(CODE, {
    produceCachedData: true
});
const bytecodeBuffer = script.cachedData; // 字节码


const anotherScript = new vm.Script(' '.repeat(CODE.length), {
    cachedData: bytecodeBuffer
});
anotherScript.runInThisContext(); // 'Hello world'