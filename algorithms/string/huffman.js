var arr = [13, 7, 8, 3, 29, 6, 1];
var str = "i like like like java do you like a java";
function avert(str) {
  var a = new Array();
  for (let i = 0; i < str.length; i++) {
    var index = isExist(str[i], a);
    if (a[index]) {
      a[index][1]++;
    } else {
      a[index] = new Array(2);
      a[index][0] = str[i];
      a[index][1] = 1;
    }
  }
  return a;
}
function isExist(n, arr) {
  var i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i][0] == n) {
      return i;
    }
  }
  return i;
}
class Node {
  constructor(ch, id) {
    this.id = id;
    this.ch = ch;
    this.code = "";
    this.left = null;
    this.right = null;
  }
}
function codeChildren(node, ch) {
  let temp = node;
  temp.code = ch + temp.code;
  if (temp.left) {
    codeChildren(temp.left, ch);
  }
  if (temp.right) {
    codeChildren(temp.right, ch);
  }
}
function sortBy(a, b) {
  return a.id - b.id;
}
function createHuffManTree(arr) {
  var nodes = new Array();

  for (let i = 0; i < arr.length; i++) {
    nodes.push(new Node(arr[i][0], arr[i][1]));
  }
  nodes.sort(sortBy);
  while (nodes.length > 1) {
    var root = new Node("", nodes[0].id + nodes[1].id);
    let node1 = nodes.shift();
    let node2 = nodes.shift();
    root.left = node1;
    //node1以及所有子节点应该拼接一个0作为赫夫曼编码
    codeChildren(node1, "0");
    root.right = node2;
    //node2以及所有子节点应该拼接一个1作为赫夫曼编码
    codeChildren(node2, "1");
    nodes.push(root);
    nodes.sort(sortBy);
  }
  console.log("赫夫曼树");
  console.log(nodes);
  return nodes[0];
}
function huffManCode(str) {
  var a = avert(str);
  var root = createHuffManTree(a);
  var list = new Array();
  findValue(root);
  function findValue(node) {
    //将赫夫曼树中有字符的节点取出
    if (node.ch != "") {
      list.push(node);
    }
    if (node.left) {
      findValue(node.left);
    }
    if (node.right) {
      findValue(node.right);
    }
  }
  console.log("二进制赫夫曼编码");
  console.log(list);
  var result = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[j].ch == str[i]) {
        result += list[j].code;
      }
    }
  }
  console.log("编码长度" + result.length);
  console.log("编码" + result);
  //下面将二进制编码转换为byte数组（二进制转十进制）
  var codes = [];
  for (let i = 0; i < result.length; ) {
    let num = "";
    for (let j = 0; j < 8; j++) {
      if (!result[i]) {
        break;
      }
      num += result[i++];
    }
    console.log(num);
    console.log(parseInt(num, 2));
    codes.push(parseInt(num, 2));
  }
  console.log(codes);
  return result;
}
var code = huffManCode(str);
