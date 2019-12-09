/**
 * A*算法
 * 
 * step1: 设置两个列表, 开启列表(存放待检查节点)与关闭列表(存放不需要再次检查的节点)
 * step2: 把起点附近的节点通过计算"路径评分F = 移动耗费G + 预估移动耗费H", 
 *        找到F最低的点, 把它移出开启列表放入关闭列表,然后继续检查这个点相邻的节点, 逐步向终点推进
 * step3: 当目标节点添加进了开启列表时, 路径已被找到, 
 * step4: 根据每一个格的父节点递归, 可以找到整个过程的路径
 * 
 * *ps*:  预估移动耗费H 通常会使用曼哈顿估量算法(使用两点的X, Y之差相加)来计算
 */




/**
 * 节点
 */
class Node{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.g = 0   // 到起点的移动消耗
        this.h = 0   // 到终点的预估消耗
        this.p = null
    }
}

/**
 * 最小堆, 方便在开放列表中找到消耗最小的节点
 */
class HeapMin{
    constructor(){
        this.set = []
    }

    adjust(index) {
        let len = this.set.length,
        l = index * 2 + 1,
        r = index * 2 + 2,
        min = index,
        node = null;

        let minNode = this.set[min]
        let lNode = this.set[l]
        let rNode = this.set[r]
        if (lNode && minNode.g + minNode.h > lNode.g + lNode.h) {
            min = l
            minNode = lNode
        }

        if (rNode && minNode.g + minNode.h > rNode.g + rNode.h) {
            min = r
            minNode = rNode
        }
    
        if (min != index) {
            node = this.set[min]
            this.set[min] = this.set[index]
            this.set[index] = node
            this.adjust(min)
        }
    }

    push(node) {
        this.set.push(node)
        for (let i = Math.floor(this.set.length / 2) - 1; i >= 0; i--) {
            this.adjust(i)
        }
    }

    pop() {
        let node = this.set.shift()
        this.adjust(0)
        return node
    }

    isEmpty() {
        return this.set.length > 0 ? false : true
    }

    contain(node) {
        return !!this.set.find(v => v.x == node.x && v.y == node.y)
    }
}


/**
 * 关闭列表
 */

class CloseSet{
    constructor(){
        this.set = []
    }
    push(node) {
        this.set.push(node)
    }
    pop() {
        return this.set.pop()
    }
    contain(node) {
        return !!this.set.find(v => v.x == node.x && v.y == node.y)
    }
}


/**
 * A*寻路算法
 */

class AStarPathFinding{
    constructor(W, H, map) {
        this.W = W
        this.H = H
        this.map = map
    }

    // 曼哈顿估量法计算预计移动消耗
    calDistance(startNode, endNode) {
        if(!startNode || !endNode) return - 1
        return Math.abs(startNode.x - endNode.x) + Math.abs(startNode.y, endNode.y)
    }

    // 查找邻居节点
    getNeighbors(node){
        let arr = []
        for(let i = -1; i < 2; i++) {
            for(let j = -1; j < 2; j++) {
                if((i == 0 && j == 0) || (i == j || i == -j)) continue
                let x = node.x + i
                let y = node.y + j
                if(x < this.W && y < this.H && x > -1 && y > - 1) {
                    arr.push(new Node(x, y))
                }
            }
        }
        return arr
    }

    //是否为墙壁(不可通过) 0表示可以通过，1表示不可以通过
    isWallNode(node){
        if (!this.map[node.y] || this.map[node.y][node.x]) return true
        return false
    }
    
    /**
     * 查找路径
     *
     * 1 初始化起始点，计算g，h
     * 2 将起始点加入到OpenSet中
     * 3 当OpenSet不为空的时候，进入循环
     * 3.1 从OpenSet中取出最小点，设为当前点
     * 3.2 循环遍历当前点的邻居点
     * 3.2.1 如果邻居点不可通过（为墙壁）或者已经在CloseSet中，就略过continue
     * 3.2.2 如果不在OpenSet中，计算FGH数值，并加入到CloseSet的尾部
     * 3.3 循环遍历邻居点结束
     * 4 OpenSet循环结束
     */
    findPath(startNode, endNode){
        let openSet = new HeapMin(),
            closeSet = new CloseSet(),
            curNode = null;
        
        openSet.push(startNode)

        while (!openSet.isEmpty()) {
            curNode = openSet.pop()
            closeSet.push(curNode)
            // 找到终点
            if(curNode.x == endNode.x && curNode.y == endNode.y) return closeSet.set

            let neighbors = this.getNeighbors(curNode)
            if (!neighbors.length) break
            for (let neighbor of neighbors) {
                if (this.isWallNode(neighbor)) continue
                if (closeSet.contain(neighbor)) continue
                if (openSet.contain(neighbor)) continue
                

                neighbor.p = curNode
                neighbor.g = this.calDistance(neighbor, startNode)
                neighbor.h = this.calDistance(neighbor, endNode)
                openSet.push(neighbor)
            }
        }

        return null
    }

    // 打印地图
    print(s, e){
        if (s.x < 0 || s.x > this.W - 1 || s.y < 0 || s.y > this.H - 1 || e.x < 0 || e.x > this.W - 1 || e.y < 0 || e.y > this.H - 1)
            return;
        let arr = this.findPath(s, e);

        if (arr == null) {
            console.log('Not found Path...');
            return;
        }

        let map = this.map.slice(),
            node = arr.pop();

        while (node !== null) {
            map[node.y][node.x] = ((s.x === node.x && s.y === node.y) || (e.x === node.x && e.y === node.y)) ? '+' : '*';
            node = node.p;
        }

        for (let i = 0; i < this.H; i++) {
            let temp = [];
            for (let j = 0; j < this.W; j++) {
                temp[j] = map[i][j];
            }
            document.write(temp.join(' ') + '<br />');
        }
    }
}








/******* 测试 *************/

// 定义地图数组 0表示可以通过，1表示不可以通过
const map = [//0 1 2 3 4 5 6 7
    [0, 0, 0, 0, 1, 0, 0, 0],//0
    [0, 0, 1, 1, 1, 0, 0, 0],//1
    [0, 0, 0, 0, 1, 0, 0, 0],//2
    [1, 1, 1, 0, 1, 0, 0, 0],//3
    [0, 0, 0, 0, 1, 0, 0, 0],//4
    [0, 0, 1, 1, 1, 0, 0, 0],//5
    [0, 0, 1, 0, 0, 0, 0, 0],//6
    [0, 0, 0, 0, 0, 0, 0, 0],//7
];

let AStarFinder = new AStarPathFinding(8, 8, map)

AStarFinder.print(new Node(0, 0), new Node(6, 4))