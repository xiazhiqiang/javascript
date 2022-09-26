import { timeStamp } from "console";

/**
 * 双端队列同时遵守了先进先出和后进先出原则，可以说它是把队列和栈相结合的一种数据结构
 */
export class Deque {
  [x: string]: any;

  constructor() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  /**
   * 在双端队列前端添加新的元素
   */
  addFront(...p: any[]) {
    p.forEach((item) => {
      if (this.isEmpty()) {
        this.addBack(item);
      } else if (this.lowestCount > 0) {
        this.lowestCount--;
        this.items[this.lowestCount] = item;
      } else {
        // 循环
        for (let i = this.count; i > this.lowestCount; i--) {
          this.items[i] = this.items[i - 1];
        }
        this.count++;
        this.items[this.lowestCount] = item;
      }
    });
  }

  /**
   * 在双端队列后端添加新的元素
   */
  addBack(...p: any[]) {
    p.forEach((item) => {
      this.items[this.count] = item;
      this.count++;
    });
  }

  /**
   * 从双端队列前端移除第一个元素
   * @returns any
   */
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    const ret = this.peekFront();
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return ret;
  }

  /**
   * 从双端队列后端移除第一个元素
   * @returns any
   */
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    const ret = this.peekBack();
    delete this.items[this.count - 1];
    this.count--;
    return ret;
  }

  /**
   * 返回双端队列前端的第一个元素
   * @returns any
   */
  peekFront() {
    return this.items[this.lowestCount];
  }

  /**
   * 返回双端队列后端的第一个元素
   * @returns any
   */
  peekBack() {
    return this.items[this.count - 1];
  }

  /**
   * 队列中不包含任何元素，返回 true，否则返回 false
   * @returns boolean
   */
  isEmpty() {
    return this.size() <= 0 ? true : false;
  }

  /**
   * 返回队列包含的元素个数
   * @returns number
   */
  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }

    const ret = [];
    for (let i = this.lowestCount; i < this.count; i++) {
      ret.push(this.items[i].toString());
    }
    return ret.join(",");
  }
}

/**
 * 回文是指从头到尾或从尾到头字符串是一样的，最简单的方法就是字符串反向排列后仍相等
 * 或者通过栈和双端队列实现
 */
export const palindromeChecker = (str = "") => {
  if (!str) {
    return false;
  }
  str = String(str).toLocaleLowerCase();
  const deque = new Deque();
  // 字符串入队列
  for (let i = 0, len = str.length; i < len; i++) {
    deque.addBack(str[i]);
  }

  // 从两端分别出队，并比较是否相等，直到队列中只剩下一个元素
  while (deque.size() > 1) {
    const front = deque.removeFront();
    const back = deque.removeBack();
    if (front !== back) {
      return false;
    }
  }

  return true;
};

export const dequeUsage = () => {
  console.log("\ndeque usage:");
  const deque = new Deque();
  deque.addBack("John", "Jack");
  console.log("deque: ", deque.toString());
  deque.removeBack();
  console.log("deque: ", deque.toString());
  deque.addFront("Tom");
  console.log("deque: ", deque.toString());
  deque.removeFront();
  console.log("deque: ", deque.toString());

  console.log("\n回文应用：");
  console.log("回文检测: ", palindromeChecker("1221"));
};
