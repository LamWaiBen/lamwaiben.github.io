/**
 * CommonJS在nodejs中的实现
 * 源码
 */
function Module() {
    this.id = ''
    this.filename = ''
    this.exports = {}

    this.parent = null
    this.children = []
}

// 静态属性
Module._cache = {}
Module._extensions = {
    '.js'(module, filename) {
        const content = fs.readFileSync(filename, 'utf-8')
        module._compile(content, filename)
    }
}

// 静态方法
Module._load = function (filename) {
    if (filename in Module._cache) {
        return Module._cache[filename].exports
    }
    const module = new Module(filename, parent)
    Module._cache[filename] = module // 先缓存, 解决循环依赖的问题
    module.load(filename)
    return module.exports
}


// 实例方法
Module.prototype.require = function (path) {
    return Module._load(path, this)
}

Module.prototype.load = function (filename) {
    const ext = path.extname(filename)
    Module._extensions[ext](this, filename)
}


const wrap = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
]
Module.prototype._compile = function (content, filename) {
    const self = this;
    const require = makeRequireFn(self)

    const wrapper = wrap.join(content)
    const compiledWrapper = new vm.Script(wrapper)

    // exports, require, module, __filename, __dirname
    const args = [self.exports, require, self, filename, __dirname]
    const result =  compiledWrapper.apply(self.exports, args)
    return result
}

function makeRequireFn(mod) {
    const Module = mod.constructor
    let require = function require(path) {
        return mod.require(path)
    }

    require.extensions = Module._extensions
    require.cache = Module._cache

    return require
}



// 手写
function customRequire(path){
    if(customRequire.cache[path]){
        return customRequire.cache[path].exports
    }
    let code = fs.readFileSync(path)
    const wrapper = '(function (exports, require, module, __filename, __dirname) {'
       + code +
    '})'
    const module = {
        exports: {}
    }

    customRequire.cache[path] = module

    // runInThisContext, 无法获取本地作用域, 但可以获取全局对象, (封闭本地作用域版的eval)
    const compiledWrapper = vm.runInThisContext(wrapper)
    let result = compiledWrapper.call(module.exports, module.exports, customRequire, module, path, __dirname)

    return result
}
customRequire.cache = {}