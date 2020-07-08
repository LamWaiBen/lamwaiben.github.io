/**
 * 树的遍历
 */



 //////////////// 递归 //////////////////
function traverse(root){
    if(!root) return
    ///////////////////////////// some code 前序遍历
    traverse(root.left)
    ///////////////////////////// some code 中序遍历
    traverse(root.right)
    ///////////////////////////// some code 后序遍历
}



 //////////////// 迭代 //////////////////
let nodeList = [], p = root;
while (p != null || nodeList.length) {
    if (p != null) {
        nodeList.push(p);
        p = p.left;
    } else {
        p = nodeList.pop();
        // do something 中序遍历
        p = p.right;
    }
}