import { stackArrayUsage } from "./stack-array";
import { stackUsage } from "./stack";
import { queueUsage } from "./queue";
import { dequeUsage } from "./deque";
import { linkedListUsage } from "./linked-list";
import { doubleLinkedListUsage } from "./double-linked-list";
import { circularLinkedListUsage } from "./circular-linked-list";
import { setUsage } from "./set";

(() => {
  // 栈数组实现
  stackArrayUsage();

  // 栈对象实现
  stackUsage();

  // 队列
  queueUsage();

  // 双端队列
  dequeUsage();

  // 链表
  linkedListUsage();

  // 双向链表
  doubleLinkedListUsage();

  // 循环链表
  circularLinkedListUsage();

  // 集合
  setUsage();
})();
