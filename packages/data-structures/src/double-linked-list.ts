import { LinkedList } from "./linked-list";
import { DoubleNode, equal } from "./utils";

/**
 * 双向链表
 * 链表包括头指针head和尾指针tail
 * 每个节点含有prev和next指针，分别指向前一个节点和下一个节点
 */
export class DoubleLinkedList extends LinkedList {
  [x: string]: any;

  constructor(equalsFn = equal) {
    super(equalsFn);
    this.tail = undefined; // 尾指针
  }

  insert(element: any, index: number) {
    if (index < 0 || index > this.count) {
      return false;
    }
    const doubleNode = new DoubleNode(element);
    if (index === 0) {
      // 头
      if (!this.head) {
        this.head = doubleNode;
        this.tail = doubleNode;
      } else {
        doubleNode.next = this.head;
        this.head.prev = doubleNode;
        this.head = doubleNode;
      }
    } else if (index === this.count - 1) {
      // 尾
      this.tail.next = doubleNode;
      doubleNode.prev = this.tail;
      this.tail = doubleNode;
    } else {
      // 中间
      const previous = this.getElementAt(index - 1);
      doubleNode.prev = previous;
      doubleNode.next = previous.next;
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
        this.head = current.next;
        this.head.prev = undefined;
      }
    } else if (index === this.count - 1) {
      // 尾
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = undefined;
    } else {
      // 中间
      current = this.getElementAt(index);
      current.prev.next = current.next;
      current.next.prev = current.prev;
    }

    // 断开链表
    current.prev = undefined;
    current.next = undefined;
    this.count--;

    return current.element;
  }
}

export const doubleLinkedListUsage = () => {
  console.log("\ndoubleLinkedList usage:");
  const doubleLinkedList = new DoubleLinkedList();

  doubleLinkedList.push("Jack");
  console.log("doubleLinkedList:", doubleLinkedList.toString());
};
