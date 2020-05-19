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
let nodeList = [], p = root, r = null;
while (nodeList.length || p != null) {
    if (p != null) {
        ///////////////////////////////////////////// some code 前序遍历
        nodeList.push(p) // nodeList 缓存父节点和左节点
        p = p.left
    } else {
        p = nodeList[nodeList.length - 1]
        if (p.right === null || p.right === r) { // 当出栈节点的右节点与上次出栈节点一致, 则不再进入右节点
            ///////////////////////////////////////// some code 后序遍历
            r = p       // 标记当前出栈节点
            nodeList.pop()
            p = null
        } else {
            p = p.right
        }
    }
}