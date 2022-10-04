import { Node, equal } from "./utils";
/**
 * 链表
 */
export class LinkedList {
  [x: string]: any;

  constructor(equalsFn = equal) {
    this.count = 0;
    this.head = undefined; // 头指针
    this.equalsFn = equalsFn;
  }

  /**
   * 向链表尾部添加一个新元素
   * @param element
   */
  push(element: any) {
    const newNode = new Node(element);
    if (!this.head) {
      // 若链表为空
      this.head = newNode;
    } else {
      // 从头部依次查找到链表尾部
      let current = this.head;
      while (current && current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.count++;
  }

  /**
   * 从特定位置移除元素
   */
  removeAt(index: number) {
    if (index < 0 || index > this.count - 1) {
      // 含空链表
      return undefined;
    }

    let current;
    if (index === 0) {
      // 头
      current = this.head;
      if (this.count === 1) {
        // 只有一个节点
        this.head = undefined;
      } else {
        // 非空链表
        this.head = current.next;
      }
    } else if (index === this.count - 1) {
      // 尾
      let previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = undefined;
    } else {
      // 中间
      let previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }

    // 断开链表
    current.next = undefined;
    this.count--;

    return current;
  }

  /**
   * 根据元素的值移除元素
   */
  remove(element: any) {
    let current = this.head;
    let previous;
    while (current) {
      if (this.equalsFn(current.element, element)) {
        previous.next = current.next;
        this.count--;
        return current;
      } else {
        previous = current;
        current = current.next;
      }
    }

    return undefined;
  }

  getElementAt(index: number) {
    if (index < 0 || index > this.count - 1) {
      return undefined;
    }
    let current = this.head;
    let previous,
      i = 0;
    while (current) {
      if (i < index) {
        previous = current;
        current = current.next;
        i++;
      }
    }
    return current;
  }

  insert(element: any, index: number) {
    if (index < 0 || index > this.count) {
      return false;
    }
    const node = new Node(element);
    if (index === 0) {
      const next = this.head;
      this.head = node;
      node.next = next;
    } else {
      const previous = this.getElementAt(index - 1);
      const next = previous.next;
      previous.next = node;
      node.next = next;
    }
    this.count++;
    return true;
  }

  indexOf(element: any) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (this.equalsFn(current.element, element)) {
        return index;
      } else {
        current = current.next;
        index++;
      }
    }

    return -1;
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  toString() {
    if (this.isEmpty() || !this.head) {
      return "";
    }
    let current = this.head;
    let ret = [];
    while (current) {
      ret.push(`${String.prototype.toString.call(current.element)}`);
      current = current.next;
    }
    return ret.join(",");
  }
}

export const linkedListUsage = () => {
  console.log("\nlinkedList usage:");
  const linkedList = new LinkedList();

  linkedList.push("Jack");
  console.log("linkedList:", linkedList.toString());
};
