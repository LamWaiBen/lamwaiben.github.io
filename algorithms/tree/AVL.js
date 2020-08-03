/**
 * AVL树的平衡函数
 * BF(BlanceFator): 平衡因子, BF > 1, 说明左偏; BF < 1, 说明右偏
 */

function blance(tree) {
    if (tree.bf > 1) {
        if (tree.left.bf > 0) {
            return rotateLeftLeft(tree)
        } else if (tree.left.bf < 0) {
            return rotateLeftRight(tree)
        }
    } else if(tree.bf < -1) {
        if(tree.right.bf < 0) {
            return rotateRightRight(tree)
        } else if(tree.right.bf > 0) {
            return rotateRightLeft(tree)
        }
    }
}

function rotateLeftLeft(tree) {
    let leftNode = tree.left
    tree.left = null
    
    if(leftNode.right) {
        tree.left = leftNode.right
    }

    leftNode.right = tree
    return leftNode
}

function rotateLeftRight(tree) {
    let leftNode = tree.left
    tree.left = null
    let leftRightNode = leftNode.right
    leftNode.right = null

    if(leftRightNode.left) {
        leftNode.right = leftRightNode.left
    }

    tree.left = leftRightNode
    leftRightNode.left = leftNode
    return rotateLeftLeft(tree)
}

function rotateRightRight(tree) {
    let rightNode = tree.right
    tree.right = null

    if(rightNode.left) {
        tree.right = rightNode.left
    }

    rightNode.left = tree
    return rightNode
}

function rotateRightLeft(tree) {
    let rightNode = tree.right
    tree.right = null
    let rightLeftNode = rightNode.left
    rightNode.left = null

    if(rightLeftNode.right) {
        rightNode.left = rightLeftNode.right
    }

    tree.right = rightLeftNode
    rightLeftNode.right = rightNode
    return rotateRightRight(tree)

}