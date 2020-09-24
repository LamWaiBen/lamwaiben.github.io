/**
 * 函数重载: 函数名一致, 根据不同的输入, 调用不同的函数, 然后返回不同的结果.
 * 
 * 思路: 
 * 不同参数长度的函数绑定到同一个名称的函数上, 当调用时传入的参数不符合最后一个绑定的函数时, 
 * 则会去检查上一个绑定的函数, 以此类推层层嵌套 
 * 
 * 缺点: 
 *  1. 只能根据参数长度区分
 *  2. 重载函数过多时, 造成性能损失
 */

function addMethod(obj, name, fn) {
    let oldFn = obj[name]
    if(oldFn) {
        obj[name] = function () {
            if(fn.length === arguments.length) {
                return fn.apply(obj, arguments)
            } else if(typeof oldFn === 'function'){
                return oldFn.apply(obj, arguments)
            }
        }
    } else {
        obj[name] = fn;
    }
}




/**
 * test case
 */
function Users(){}
addMethod(Users.prototype, "find", function(){
    console.log('// Find all users...')
});
addMethod(Users.prototype, "find", function(name){
    console.log('// Find a user by name')
});
addMethod(Users.prototype, "find", function(first, last){
    console.log('// Find a user by first and last name')
});


var users = new Users();
users.find(); // Finds all
users.find("John"); // Finds users by name
users.find("John", "Resig"); // Finds users by first and last name
users.find("John", "E", "Resig"); // Finds all