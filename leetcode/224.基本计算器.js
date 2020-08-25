/*
 * @lc app=leetcode.cn id=224 lang=javascript
 *
 * [224] 基本计算器
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// var calculate = function(s) {
//   let sum = 0,
//       stack = [],
//       sign = 1,
//       i = 0,
//       n = s.length;
  
//   while (i < n) {
//     let c = s.charAt(i);
//     if (c === ' ') {
//       i++;
//     }
//     else if (c === '-') {
//       sign = -1;
//       i++;
//     }
//     else if (c === '+') {
//       sign = 1;
//       i++;
//     }
//     else if (c === '(') {
//       stack.push( sum, sign );
//       sum = 0;
//       sign = 1;
//       i++;
//     }
//     else if (c === ')') {
//       sum = sum * stack.pop() + stack.pop();
//       i++;
//     }
//     else {
//       let temp = c;
//       i++;
//       while (i < n && isNumber( s.charAt(i) )) {
//         temp += s.charAt(i);
//         i++;
//       }
//       sum += Number( temp ) * sign;
//     }
//   }
  
//   console.log( stack );
  
//   return sum;
// };

// function isNumber(n) {
//   n = Number( n );
//   return typeof n === 'number' && !isNaN( n );
// }
var calculate = function(s) {
    let i = 0, stack = [];
    while (i < s.length) {
        if(s[i] === ' ') {
        } else if(s[i] === '(') {
            let cnt = 1
            let j = i
            while (cnt) {
                i++;
                if (s[i] === '(') {
                    cnt += 1
                } else if (s[i] === ')') {
                    cnt -= 1
                }
            }
            stack.push(calculate(s.substring(j + 1, i)));
            // i = j
        } else if(s[i] !== ')'){
            if(isNaN(s[i])) {
                stack.push(s[i])
            } else {
                // let j = i
                let numStr = s[i];
                while (!isNaN(s[i + 1]) && s[i + 1] != "") {
                    numStr += s[i + 1]
                    i++
                }
                numStr && stack.push(numStr);

            }
        }
        i++
    }
    // console.log(stack)
    return stack.reduce((a, b, i) => {
        if(b >= 0 || b < 10) {
            b = parseInt(b);
            if(i === 0) return b;
            if(stack[i - 1] === "-") {
                return a - b;
            } else if(stack[i - 1] === "+") {
                return a + b;
            }
        }
        return a
    }, 0)
};
// @lc code=end

// console.log(calculate("2147483647")) // 2
// console.log(calculate("1 + 1")) // 2
// console.log(calculate(" 2-1 + 2 ")) // 3
// console.log(calculate("(1+(4+5+2)-3)+(6+8)")) // 23

