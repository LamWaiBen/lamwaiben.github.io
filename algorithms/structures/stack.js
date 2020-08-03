class Stack{
    constructor(){
        this.list = []
    }
}



class IncStack extends Stack{
    constructor(){
        super()
    }
}

class DecStack extends Stack{
    constructor(){
        super()
    }
}
// function decStackTemplate(arr) {
//     const stack = [arr[0]]
//     for (let i = 1; i < arr.length; i++) {
//         // 当新元素比栈顶元素大的时候, 需要先出栈
//         while (stack.length > 0 && stack[stack.length - 1] < arr[i]) {
//             const cur = stack.pop()
//             // do something  cur & arr[i]
//         }
//         stack.push(arr[i])
//     }
// }
