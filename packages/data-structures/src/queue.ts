/**
 * 队列是遵循先进先出（FIFO）
 * 队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。
 */
export class Queue {
  [x: string]: any;

  constructor() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0; // 标识从队头部移除元素
  }

  /**
   * 向队列尾部添加一个（或多个）新的项
   */
  enqueue(...p: any[]) {
    p.forEach((item) => {
      this.items[this.count] = item;
      this.count++;
    });
  }

  /**
   * 移除队列的第一项（即排在队列最前面的项）并返回被移除的元素。
   * @returns any
   */
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const ret = this.peek();
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return ret;
  }

  /**
   * 返回队列中第一个元素
   * @returns any
   */
  peek() {
    return this.items[this.lowestCount];
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
 * 击鼓传花，利用队列出队列后回插到队尾形成循环队列
 * @param elements
 * @param num
 * @returns any
 */
export const hotPotato = (elements: any[], num: number) => {
  const queue = new Queue();
  elements.forEach((item) => {
    queue.enqueue(item);
  });

  const eliminated = []; // 淘汰的
  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i++) {
      // 队头移除后回插到队尾
      queue.enqueue(queue.dequeue());
    }
    eliminated.push(queue.dequeue());
  }

  return {
    eliminated,
    winner: queue.dequeue(),
  };
};

export const queueUsage = () => {
  console.log("\nqueue usage:");
  const queue = new Queue();
  queue.enqueue("John", "Jack");
  console.log("queue: ", queue.toString());
  queue.dequeue();
  console.log("queue: ", queue.toString());

  console.log("\n队列应用：");
  console.log(
    "击鼓传花: ",
    hotPotato(["John", "Jack", "Camila", "Ingrid", "Carl"], 7)
  );
};
