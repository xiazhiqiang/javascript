/**
 * 集合
 */
export class Set {
  [x: string]: any;

  constructor() {
    this.items = {};
  }

  /**
   * 向集合添加一个新元素
   */
  add(element: any) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }

    return false;
  }

  /**
   * 从集合移除一个元素。
   */
  delete(element: any) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  /**
   * 如果元素在集合中，返回 true，否则返回 false。
   */
  has(element: any) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  /**
   * 移除集合中的所有元素。
   */
  clear() {
    this.items = {};
  }

  /**
   * 返回集合所包含元素的数量。它与数组的 length 属性类似。
   */
  size() {
    return Object.keys(this.items).length;
  }

  /**
   * 返回一个包含集合中所有值（元素）的数组。
   */
  values() {
    return Object.values(this.items);
  }

  /**
   * 并集
   */
  union(otherSet: any) {
    const unionSet = new Set();
    this.values().forEach((i) => unionSet.add(i));
    otherSet.values().forEach((i: any) => unionSet.add(i));
    return otherSet;
  }

  /**
   * 交集
   */
  intersection(otherSet: any) {
    const intersectionSet = new Set();
    const size1 = this.size();
    const size2 = otherSet.size();
    const smallSet = size1 > size2 ? otherSet : this;
    const bigSet = size1 > size2 ? this : otherSet;
    // 优化循环
    smallSet.values().forEach((i: any) => {
      if (bigSet.has(i)) {
        intersectionSet.add(i);
      }
    });
    return intersectionSet;
  }

  /**
   * 差集
   * @param otherSet
   * @returns
   */
  difference(otherSet: any) {
    const differenceSet = new Set();
    this.values().forEach((i) => {
      if (!otherSet.has(i)) {
        differenceSet.add(i);
      }
    });
    return differenceSet;
  }

  /**
   * 子集
   * @param otherSet
   */
  isSubsetOf(otherSet: any) {
    return otherSet.values().every((i: any) => this.has(i));
  }
}

export const setUsage = () => {
  console.log("\nset usage:");
  const set = new Set();
  set.add(1);
  set.add(2);

  console.log("set: ", set.values());
};
