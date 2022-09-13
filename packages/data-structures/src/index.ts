import { stackArrayUsage } from "./stack-array";
import { stackUsage } from "./stack";
import { queueUsage } from "./queue";
import { dequeUsage } from "./deque";

(() => {
  // 栈数组实现
  stackArrayUsage();

  // 栈对象实现
  stackUsage();

  // 队列
  queueUsage();

  // 双端队列
  dequeUsage();
})();
