import { LinkedList } from "./linked-list";
import { defaultEqual, Node } from "./utils";

/**
 * 循环链表
 */
export class CircularLinkedList extends LinkedList {
  [x: string]: any;

  constructor(equalsFn = defaultEqual) {
    super(equalsFn);
  }

  insert(element: any, index: number) {
    if (index < 0 || index > this.count) {
      return false;
    }
    const node = new Node(element);
    if (index === 0) {
      // 头
      if (!this.head) {
        // 空链表
        node.next = this.head;
        this.head = node;
      } else {
        // 非空链表
        // 获取队尾元素
        const lastNode = this.getElementAt(this.count - 1);
        node.next = this.head;
        lastNode.next = node;
        this.head = node;
      }
    } else if (index === this.count - 1) {
      // 尾
      const lastNode = this.getElementAt(index);
      node.next = this.head;
      lastNode.next = node;
    } else {
      // 中间
      const previous = this.getElementAt(index - 1);
      node.next = previous.next;
      previous.next = node;
    }
    this.count++;

    return true;
  }

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
        const lastNode = this.getElementAt(this.count - 1);
        lastNode.next = current.next;
        this.head = current.next;
      }
    } else {
      // 尾和中间
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }

    // 断开节点
    current.next = undefined;
    this.count--;

    return current.element;
  }
}

export const circularLinkedListUsage = () => {
  console.log("\ncircularLinkedList usage:");
  const circularLinkedList = new CircularLinkedList();

  circularLinkedList.push("Jack");
  console.log("circularLinkedList:", circularLinkedList.toString());
};
