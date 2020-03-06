export default class BinaryTreeNode {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.value = value;
    }

    get leftHeight() {
        return this.left ? this.left.hight + 1 : 0;
    }

    get rightHeight() {
        return this.right ? this.right.hight + 1 : 0;
    }

    get height() {
        return Math.max(this.leftHeight, this.rightHeight);
    }

    get uncle() {
        if (!this.parent) return undefined;
        if (!this.parent.parent) return undefined;

        if (!this.parent.parent.left || !this.parent.parent.right) return undefined;

        if (this.parent.parent.left == this) return this.parent.parent.right;

        return this.parent.parent.left;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setLeft(node) {
        if (this.left) this.left.parent = null;

        this.left = node

        if (this.left) this.left.parent = this;

        return this;
    }

    setRight(node) {
        if (this.right) this.right.parent = null;

        this.right = node

        if (this.right) this.right.parent = this;

        return this;
    }

    removeChild(nodeToRemove) {
        if (this.left && this.left === nodeToRemove) {
            this.left = null;
            return true;
        }

        if(this.right && this.right === nodeToRemove) {
            this.right = null;
            return true;
        }
        
        return false;
    }

    replaceChild(nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) return false;

        if (this.left && this.left === nodeToReplace) {
            this.left = replacementNode;
            return true;
        }

        if (this.right && this.right === nodeToReplace) {
            this.right = replacementNode;
            return true;
        }

        return false
    }

}
