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
};
