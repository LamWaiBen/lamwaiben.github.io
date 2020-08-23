class Node {
  constructor(id) {
    this.id = id;
    this.left = null;
    this.right = null;
  }
}

function sortBy(a, b) {
  // 从小到大排序
  return a.id - b.id;
}

// 得到一颗自下而上递增的树
function createHuffmanTree(arr) {
  const nodes = arr.map((v) => new Node(v));
  nodes.sort(sortBy);

  while (nodes.length > 1) {
    const node = new Node(nodes[0].id + nodes[1].id);
    node.left = nodes.shift();
    node.right = nodes.shift();
    nodes.push(node);
    nodes.sort(sortBy);
  }
  return nodes[0];
}

console.log(createHuffmanTree([13, 7, 8, 3, 29, 6, 1]));
