import { DoubleLinkedList } from "./double-linked-list";
import { DoubleNode, equal, Node } from "./utils";

/**
 * 双向循环链表
 */
export class CircularDoubleLinkedList extends DoubleLinkedList {
  [x: string]: any;

  constructor(equalsFn = equal) {
    super(equalsFn);
  }

  insert(element: any, index: number) {
    if (index < 0 || index > this.count) {
      return false;
    }
    const doubleNode = new DoubleNode(element);
    if (index === 0) {
      // 头
      if (this.count === 0) {
        // 空链表
        doubleNode.next = doubleNode;
        doubleNode.prev = doubleNode;
        this.head = doubleNode;
        this.tail = doubleNode;
      } else {
        // 非空链表
        doubleNode.next = this.head;
        doubleNode.prev = this.tail;
        this.head = doubleNode;
        this.tail.next = doubleNode;
      }
    } else if (index === this.count - 1) {
      // 尾
      doubleNode.next = this.head;
      doubleNode.prev = this.tail;
      this.tail = doubleNode;
      this.head.prev = doubleNode;
    } else {
      // 中间
      const previous = this.getElementAt(index - 1);
      doubleNode.next = previous.next;
      doubleNode.prev = previous;
      previous.next.prev = doubleNode;
      previous.next = doubleNode;
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
        this.tail = undefined;
      } else {
        // 非空链表
        current.next.prev = current.prev;
        current.prev.next = current.next;
        this.head = current.next;
      }
    } else if (index === this.count - 1) {
      // 尾
      current = this.tail;
      current.next.prev = current.prev;
      current.prev.next = current.next;
      this.tail = current.prev;
    } else {
      // 中间
      current = this.getElementAt(index);
      current.next.prev = current.prev;
      current.prev.next = current.next;
    }

    // 断开链表
    current.next = undefined;
    current.prev = undefined;
    this.count--;

    return current.element;
  }
}

export const CircularDoubleLinkedListUsage = () => {
  console.log("\ncircularDoubleLinkedList usage:");
  const circularDoubleLinkedList = new CircularDoubleLinkedList();

  circularDoubleLinkedList.push("Jack");
  console.log("circularDoubleLinkedList:", circularDoubleLinkedList.toString());
};
