function _instanceof(a, b) {
    while (a) {
        let proto = Object.getPrototypeOf(a)        // 相当于webkit的 a.__proto___ 
        if(proto == b.prototype) return true
        a = proto
    }
    return false
}

// 测试
function Test(a){
    this.a = a
}
var a = new Test("a")
_instanceof(a, Test)        // true