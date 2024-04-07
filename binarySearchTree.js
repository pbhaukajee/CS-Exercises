class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    return this.constructBalancedBST(sortedArray, 0, sortedArray.length - 1);
  }

  constructBalancedBST(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.constructBalancedBST(array, start, mid - 1);
    node.right = this.constructBalancedBST(array, mid + 1, end);

    return node;
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      //Node have no children
      if (node.left === null && node.right === null) {
        return null;
      }

      //Node has one child
      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      //Node has two children
      const successor = this.findMinNode(node.right);
      node.data = successor.data;
      node.right = this.deleteNode(node.right, successor.data);
    }
    return node;
  }

  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }

  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);

prettyPrint(tree.root);
tree.insert(50);
console.log("After inserting 50:");
prettyPrint(tree.root);

tree.deleteItem(23);
console.log("After deleting 23:");
prettyPrint(tree.root);
