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
// 前序遍历和中序遍历的模板
// 队列:  [根节点]  ->  [根节点, 根的左节点]  ->  [根节点]  ->  [] -> [根的右节点] -> []
let nodeList = [], p = root;
while (p != null || nodeList.length) {
    if (p != null) {
        // p 前序遍历 父 -> 左 -> 右
        // do something

        nodeList.push(p);
        p = p.left;
    } else {
        p = nodeList.pop();
        // p 中序遍历  左 -> 父 -> 右
        // do something

        p = p.right;
    }
}

// 后序遍历的模板
// 队列:  [根节点]  ->  [根节点, 根的左节点]  ->  [根节点]  ->  [根节点, 根的右节点] -> [根节点] -> []

let nodeList = [], p = root, r = null;
while (p != null || nodeList.length) {
    if (p != null) {
        nodeList.push(p)
        p = p.left
    } else {
        p = nodeList[nodeList.length - 1]

        if(p.right === null || p.right === r) {
            // p 后序遍历, 左 -> 右 -> 父
            // do something

            r = p
            nodeList.pop()
            p = null
        } else {
            p = p.right
        }
    }
}