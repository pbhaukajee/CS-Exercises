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

  findNode(node, value) {
    if (node === null || node.data === value) {
      return node;
    }

    if (value < node.data) {
      return this.findMinNode(node.left, value);
    } else {
      return this.findMinNode(node.right, value);
    }
  }

  levelOrder(callback, queue = [this.root], result = []) {
    if (!this.root) {
      return [];
    }

    if (!queue.length) {
      return result;
    }

    const currentNode = queue.shift();

    if (callback) {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }

    if (currentNode.left) {
      queue.push(currentNode.left);
    }

    if (currentNode.right) {
      queue.push(currentNode.right);
    }

    return this.levelOrder(callback, queue, result);
  }

  inOrder(callback, node = this.root, result = []) {
    if (!node) {
      return result;
    }

    this.inOrder(callback, node.left, result);

    if (callback) {
      callback(node);
    } else {
      result.push(node.data);
    }

    this.inOrder(callback, node.right, result);

    return result;
  }

  preOrder(callback, node = this.root, result = []) {
    if (!node) {
      return result;
    }

    if (callback) {
      callback(node);
    } else {
      result.push(node.data);
    }

    this.preOrder(callback, node.left, result);
    this.preOrder(callback, node.right, result);

    return result;
  }

  postOrder(callback, node = this.root, result = []) {
    if (!node) {
      return result;
    }

    this.postOrder(callback, node.left, result);
    this.postOrder(callback, node.right, result);

    if (callback) {
      callback(node);
    } else {
      result.push(node.data);
    }

    return result;
  }

  height(node) {
    if (!node) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (!node) {
      return -1;
    }

    const parentDepth = this.depth(node.parent);

    return parentDepth + 1;
  }

  isBalanced(node = this.root) {
    if (!node) {
      return true;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
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

console.log("Level order traversal with recursion:");
tree.levelOrder((node) => {
  console.log(node.data);
});
console.log("Level order traversal with recursion (no callback):");
console.log(tree.levelOrder());

// Using inOrder with callback
console.log("In-order traversal:");
tree.inOrder((node) => {
  console.log(node.data);
});

// Using inOrder without callback
console.log("In-order traversal (no callback):");
console.log(tree.inOrder());

// Using preOrder with callback
console.log("Pre-order traversal:");
tree.preOrder((node) => {
  console.log(node.data);
});

// Using preOrder without callback
console.log("Pre-order traversal (no callback):");
console.log(tree.preOrder());

// Using postOrder with callback
console.log("Post-order traversal:");
tree.postOrder((node) => {
  console.log(node.data);
});

// Using postOrder without callback
console.log("Post-order traversal (no callback):");
console.log(tree.postOrder());

// Calculate and print the height of the root node
console.log("Height of the root node:", tree.height(tree.root));
