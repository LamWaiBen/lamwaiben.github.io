import { BinaryTreeNode } from "./BinaryTreeNode";
export default class BinarySearchTreeNode extends BinaryTreeNode {
    constructor(value) {
        super(value)
    }

    insert(value) {
        if (this.value === null) {
            this.value = value
            return this
        }

        if (value < this.value) {
            if (this.left) {
                return this.left.insert(value)
            }

            const newNode = new BinarySearchTreeNode(value)
            this.left = newNode
            return newNode
        }

        if (value >= this.value) {
            if (this.right) {
                return this.right.insert(value)
            }
            const newNode = new BinarySearchTreeNode(value)
            this.right = newNode
            return newNode
        }

        return this
    }

    find(value) {
        if (value == this.value) return this

        if (value < this.value && this.left) {
            return this.left.find(value)
        }

        if (value > this.value && this.right) {
            return this.right.find(value)
        }

        return null
    }

    contains(value) {
        return !!this.find(value)
    }

    remove(value) {
        const nodeToRemove = this.find(value)
        if (!nodeToRemove) return false

        const { parent, left, right } = nodeToRemove

        if (!left && !right) {
            if (parent) {
                parent.removeChild(nodeToRemove)
            } else {
                nodeToRemove.setValue(undefined)
            }
        } else if (left && right) {
            // 找出右节点的最小值, 用最小值的值去替换待删除节点的值, 看起来像是"被删掉"
            // 然后把最小值删掉, 由于最小值必然是的子节点数不可能为2, 所以不需要考虑两个节点都存在的情况
            let nextBiggerNode = right.findMin()
            // if (nextBiggerNode !== right) {
                nodeToRemove.setValue(nextBiggerNode.value)
                this.remove(nextBiggerNode.value)
            // } else {
            //     nodeToRemove.setValue(right.value)
            //     nodeToRemove.setRight(right.right)
            // }
        } else {
            const childNode = left || right
            if(parent) {
                parent.replaceChild(nodeToRemove, childNode)
            } else {
                nodeToRemove.setValue(childNode.value)
                nodeToRemove.setLeft(childNode.left)
                nodeToRemove.setRight(childNode.right)
            }
        }

        nodeToRemove.parent = null
        return true
    }

    findMin() {
        if (!this.left) return this
        return this.left.findMin()
    }
}