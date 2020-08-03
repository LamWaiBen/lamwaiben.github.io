# 数据结构与算法

学习并记录常用的数据结构与算法.  
解题策略:

-   把具体问题抽象成数据结构
-   根据数据结构的特点是用对应的算法来解决问题

## 数据结构

1. 数组与链表
2. 栈与队列
3. 树
4. 图
5. 哈希表
6. 堆 - 最大堆 & 最小堆
7. 字典树

## 算法

1. 排序算法: 冒泡排序, 插入排序, 选择排序, 快速排序, 归并排序, 计数排序
2. 搜索算法: 回溯, 递归, 剪枝
3. 图论: 最短路径, 最小生成树, 网络流建模
4. 动态规划: 背包问题, 最长子序列 LIS, 计数问题
5. 基础技巧: 分治, 倍增, 二分法, 贪心算法

## 代码模板

### 数据结构

#### 单调栈

```javascript
function incStack(arr) {
    const stack = [arr[0]]

    for(let i = 1; i < arr.length; i++) {
        while(stack.length && stack[stack.length - 1] > arr[i]) {
            // 不符合单调栈的规则时, 需要先出栈
            let item = stack.pop()
            // do something  对一段区间内的元素进行计算
        }

        stack.push(arr[i])
    }
}

```

-   leetcode
    -   42. 接雨水
    -   84. 柱状图中最大的矩形
    -   496. 下一个更大元素

#### 二分查找树

#### AVL 树(平衡二叉树)

BF(BlanceFator): 某结点的左子树与右子树的高度(深度)差即为该结点的平衡因子, BF > 1, 说明左偏; BF < -1, 说明右偏

AVL 树有 4 种旋转机制

-   LL
-   LR
-   RR
-   RL

其中 LR 旋转和 RL 旋转步骤最多, 需要先调整为适合 LL 或 LR 旋转的结构, 再进行 LL 或 LR 旋转

```javascript
function blance(rootNode) {
    if (rootNode.bf > 1) {
        if (rootNode.left.bf > 0) {
            return rotateLeftLeft(rootNode);
        } else if (rootNode.left.bf < 0) {
            return rotateLeftRight(rootNode);
        }
    } else if (rootNode.bf < -1) {
        if (rootNode.right.bf < 0) {
            return rotateRightRight(rootNode);
        } else if (rootNode.right.bf > 0) {
            return rotateRightLeft(rootNode);
        }
    }
}

function rotateLeftLeft(rootNode) {
    let leftNode = rootNode.left;
    rootNode.left = null;

    if (leftNode.right) {
        rootNode.left = leftNode.right;
    }

    leftNode.right = rootNode;
    return leftNode;
}

function rotateLeftRight(rootNode) {
    let leftNode = rootNode.left;
    rootNode.left = null;
    let leftRightNode = leftNode.right;
    leftNode.right = null;

    if (leftRightNode.left) {
        leftNode.right = leftRightNode.left;
    }

    rootNode.left = leftRightNode;
    leftRightNode.left = leftNode;
    return rotateLeftLeft(rootNode);
}

function rotateRightRight(rootNode) {
    let rightNode = rootNode.right;
    rootNode.right = null;

    if (rightNode.left) {
        rootNode.right = rightNode.left;
    }

    rightNode.left = rootNode;
    return rightNode;
}

function rotateRightLeft(rootNode) {
    let rightNode = rootNode.right;
    rootNode.right = null;
    let rightLeftNode = rightNode.left;
    rightNode.left = null;

    if (rightLeftNode.right) {
        rightNode.left = rightLeftNode.right;
    }

    rootNode.right = rightLeftNode;
    rightLeftNode.right = rightNode;
    return rotateRightRight(rootNode);
}
```

#### 最小堆/最大堆

堆是完全二叉树, 完全二叉树可以用数组来实现其结构.  
通过父节点与子节点索引之间的关系, 来比较他们的大小

-   leetcode
    -   215. 数组中的第 K 个最大元素

#### 图

图的遍历与树的遍历很相似, 只是图需要记录已经遍历过的节点

```javascript
function graph_bfs(graph, start) {
    const stack = [];
    stack.push(start);
    const set = new Set();
    set.add(start);
    while (stack.length) {
        const list = graph[stack.pop()];
        for (let node of list) {
            if (set.has(node)) continue;
            stack.push(node);
            set.add(node);
        }
    }
}
```

### 算法

#### 滑动窗口

```javascript
function slidingWindow(str) {
    let left = 0,
        right = 0;
    while (right < s.length) {
        // r: 移入窗口的字符
        let r = str[right];
        // 窗口右移
        right++;
        // do logic

        while (true) {
            // 满足一定条件, 窗口需要右移
            // l: 移出窗口的字符
            let l = str[left];
            // 窗口右移
            left++;
            // do logic
        }
    }
}
```

-   leetcode
    -   209. 长度最小的子数组

#### 树的深度遍历

-   递归的方式

    ```javascript
    function recursion(root) {
        if (!root) return;
        ///////////////////////////// some code 前序遍历 根 -> 左 -> 右
        recursion(root.left);
        ///////////////////////////// some code 中序遍历 左 -> 根 -> 右
        recursion(root.right);
        ///////////////////////////// some code 后序遍历 左 -> 右 -> 根
    }
    ```

-   遍历的方式

    ```javascript
    // 前序遍历和中序遍历的模板
    // 队列:  [根节点]  ->  [根节点, 根的左节点]  ->  [根节点]  ->  [] -> [根的右节点] -> []
    function iterate(root) {
        let nodeList = [],
            p = root;
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
    }

    // 后序遍历的模板
    // 队列:  [根节点]  ->  [根节点, 根的左节点]  ->  [根节点]  ->  [根节点, 根的右节点] -> [根节点] -> []

    function iterate(root) {
        let nodeList = [],
            p = root,
            r = null;
        while (p != null || nodeList.length) {
            if (p != null) {
                nodeList.push(p);
                p = p.left;
            } else {
                p = nodeList[nodeList.length - 1];

                if (p.right === null || p.right === r) {
                    // p 后序遍历, 左 -> 右 -> 父
                    // do something

                    r = p;
                    nodeList.pop();
                    p = null;
                } else {
                    p = p.right;
                }
            }
        }
    }
    ```

#### 树的广度遍历

适合大范围搜索, 如: 寻路

#### 回溯

```javascript
// 代码框架
function backtrack(res, len, list, nums) {
    if (list.length === len) {
        res.push([...list]);
        return;
    }

    // 做当前范围内的允许的选择, 然后撤回
    for (let i = 0; i < nums.length; i++) {
        list.push(nums[i]);
        backtrack(res, len + 1, list, nums);
        list.pop();
    }
}
```

-   leetcode
    -   40. 组合总和 II
    -   46. 全排列
    -   47. 全排列 II
    -   78. 子集
    -   90. 子集 II

#### 二分法

## 参考

-   [JavaScript 算法与数据结构](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)
-   [五分钟学算法](https://github.com/MisterBooo/LeetCodeAnimation)
