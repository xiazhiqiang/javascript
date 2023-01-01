import { TreeNode, defaultCompare } from "./utils";

/**
 * 二叉搜索树，左侧节点key比右侧节点小
 */
export class BinarySearchTree {
  [x: string]: any;

  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null; // 根节点
  }

  insert(key: any) {
    if (this.root) {
      this.root = new TreeNode(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  insertNode(node: any, key: any) {
    if (this.compareFn(key, node.key) < 0) {
      if (node.left) {
        this.insertNode(node.left, key);
      } else {
        node.left = new TreeNode(key);
      }
    } else {
      if (node.right) {
        this.insertNode(node.right, key);
      } else {
        node.right = new TreeNode(key);
      }
    }
  }

  /**
   * 中序遍历：左根右
   * @param callback
   */
  inOrderTraverse(callback: any) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node: any, callback: any) {
    if (!node) {
      return;
    }
    this.inOrderTraverseNode(node.left, callback);
    callback(node.key);
    this.inOrderTraverseNode(node.right, callback);
  }

  /**
   * 前序遍历：根左右
   * @param callback
   */
  preOrderTraverse(callback: any) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node: any, callback: any) {
    if (!node) {
      return;
    }
    callback(node.key);
    this.preOrderTraverseNode(node.left, callback);
    this.preOrderTraverseNode(node.right, callback);
  }

  /**
   * 后序遍历：左右根
   * @param callback
   */
  postOrderTraverse(callback: any) {
    this.postOrderTraverseNode(this.root, callback);
  }
  postOrderTraverseNode(node: any, callback: any) {
    if (!node) {
      return;
    }
    this.postOrderTraverseNode(node.left, callback);
    this.postOrderTraverseNode(node.right, callback);
    callback(node.key);
  }

  min() {
    this.minNode(this.root);
  }
  minNode(node: any) {
    // 类似遍历链表
    let current = node;
    while (current) {
      if (current.left) {
        current = current.left;
      }
    }
    return current;
  }

  max() {}
  maxNode(node: any) {
    // 类似遍历链表
    let current = node;
    while (current) {
      if (current.right) {
        current = current.right;
      }
    }
    return current;
  }

  search(key: any) {
    return this.searchNode(this.root, key);
  }
  searchNode(node: any, key: any): boolean {
    if (!node) {
      return false;
    }
    if (this.compareFn(key, node.key) < 0) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) > 0) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  remove(key: any) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node: any, key: any) {
    if (!node) {
      return null;
    }
    if (this.compareFn(key, node.key) > 0) {
      node.right = this.removeNode(node.right, key);
    } else if (this.compareFn(key, node.key) < 0) {
      node.left = this.removeNode(node.left, key);
    } else {
      // 找到相同的节点
      if (!node.left && !node.right) {
        node = null;
        return node;
      }
      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }
      // 删除非叶子节点
      const rightMinNode = this.minNode(node.right);
      node.key = rightMinNode.key;
      node.right = this.removeNode(node.right, rightMinNode.key);
      return node;
    }
  }
}
