/**
 * 栈是一种“后进先出”（LIFO：last in first out）的有序的数据结构。
 * 在栈里，新元素都靠近栈顶，旧元素都接近栈底。
 */
export default class StackArray {
  [x: string]: any;

  constructor() {
    this.items = []; // 数组堆栈
  }

  /**
   * 添加一个（或几个）新元素到栈顶。
   */
  push(...params: any[]) {
    this.items.push(...params);
  }

  /**
   * 移除栈顶的元素，同时返回被移除的元素。
   * @returns number
   */
  pop() {
    return this.items.pop();
  }

  /**
   * 返回栈顶的元素， 不对栈做任何修改 （该方法不会移除栈顶的元素， 仅仅返回它）。
   * @returns number
   */
  peek() {
    return this.isEmpty() ? undefined : this.items[this.items.length - 1];
  }

  /**
   * 如果栈里没有任何元素就返回 true，否则返回 false。
   * @returns boolean
   */
  isEmpty() {
    return this.items.length <= 0;
  }

  /**
   * 移除栈里的所有元素。
   */
  clear() {
    this.items.length = 0;
  }

  /**
   * 返回栈里的元素个数。该方法和数组的 length 属性很类似。
   * @returns number
   */
  size() {
    return this.items.length;
  }

  /**
   * 打印栈内容
   * @returns string
   */
  toString() {
    return this.items.join(",");
  }
}

/**
 * 利用堆栈实现十进制转换2-35进制
 * @param decimalNumber number
 * @return number
 */
export const decimalToBinary = function (decimalNumber: number, base: number) {
  if (base < 2 || base >= 36) {
    return "";
  }

  const stack = new StackArray();
  do {
    const mod = decimalNumber % base;
    stack.push(mod);
    decimalNumber = Math.floor(decimalNumber / base);
  } while (decimalNumber !== 0);

  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 数字展示，超过10进制的通过索引指定对应的数字字符展示
  let ret = "";
  do {
    ret += digits[stack.pop()];
  } while (!stack.isEmpty());

  return ret;
};

export const stackArrayUsage = () => {
  console.log("\nstack array usage:");

  const stack = new StackArray();
  stack.push(1, 2);
  console.log("stack: ", stack.toString());
  console.log("stack length", stack.size());
  stack.pop();
  console.log("stack: ", stack.toString());
  console.log("stack length", stack.size());

  console.log("\n栈应用：");
  console.log("进制转换 100345 to 16: ", decimalToBinary(100345, 16));
};
