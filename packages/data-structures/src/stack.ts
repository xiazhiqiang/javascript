import { print } from "./utils";

/**
 * 对象堆栈
 */
export class Stack {
  [x: string]: any;

  constructor() {
    this.items = {};
    this.count = 0;
  }

  /**
   * 添加一个（或几个）新元素到栈顶。
   */
  push(...params: any[]) {
    params.forEach((item) => {
      this.items[this.count] = item;
      this.count++;
    });
  }

  /**
   * 移除栈顶的元素，同时返回被移除的元素。
   * @returns any
   */
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    const ret = this.peek();
    delete this.items[this.count - 1];
    this.count--;
    return ret;
  }

  /**
   * 返回栈顶的元素， 不对栈做任何修改 （该方法不会移除栈顶的元素， 仅仅返回它）。
   * @returns any
   */
  peek() {
    return this.isEmpty() ? undefined : this.items[this.count - 1];
  }

  /**
   * 如果栈里没有任何元素就返回 true，否则返回 false。
   * @returns boolean
   */
  isEmpty() {
    return this.size() <= 0;
  }

  /**
   * 移除栈里的所有元素。
   */
  clear() {
    this.items = {};
    this.count = 0;
  }

  /**
   * 返回栈里的元素个数。该方法和数组的 length 属性很类似。
   * @returns number
   */
  size() {
    return this.count;
  }

  /**
   * 打印栈内容
   * @returns string
   */
  toString() {
    if (this.isEmpty()) {
      return "";
    }

    let ret = [];
    for (let i = 0; i < this.count; i++) {
      ret.push(`${this.items[i].toString()}`);
    }

    return ret.join(",");
  }
}

export const stackUsage = () => {
  print("\nstack usage:");

  const stack = new Stack();
  stack.push(3, 4);
  print("stack: ", stack.toString());
  stack.pop();
  print("stack: ", stack.toString());
};
