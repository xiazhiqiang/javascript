import { LinkedList } from "./linked-list";
import { defaultToString, ValuePair } from "./utils";

/**
 * 散列表
 */
export class HashTable {
  [x: string]: any;

  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  /**
   * 键转换散列值
   * @param key
   * @returns
   */
  loseloseHashCode(key: any) {
    if (typeof key === "number") {
      return key;
    }

    const str = this.toStrFn(key);
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      hash += str.charCodeAt(i);
    }
    return hash % 37;
  }

  put(key: any, value: any) {
    const hash = this.loseloseHashCode(key);
    this.table[hash] = new ValuePair(key, value);
  }

  get(key: any) {
    const hash = this.loseloseHashCode(key);
    return this.table[hash] ? this.table[hash].value : undefined;
  }

  remove(key: any) {
    const hash = this.loseloseHashCode(key);
    if (this.table[hash] !== undefined) {
      delete this.table[hash];
      return true;
    }
    return false;
  }
}

/**
 * 分离链接散列表
 * 将散列值映射为一个链表，从而解决相同散列值映射冲突的问题
 */
export class HashTableSeparateChaining extends HashTable {
  [x: string]: any;

  constructor(toStrFn = defaultToString) {
    super(toStrFn);
  }

  put(key: any, value: any) {
    const hash = this.loseloseHashCode(key); // hash会有冲突
    if (!this.table[hash]) {
      this.table[hash] = new LinkedList(function (a, b) {
        return a.key === b.key && a.value === b.value; // 链表中的valuePair比较
      });
    }
    this.table[hash].push(new ValuePair(key, value));
  }

  get(key: any) {
    const hash = this.loseloseHashCode(key); // hash会有冲突
    if (!this.table[hash]) {
      return undefined;
    }
    let current = this.table[hash].getHead();
    while (current) {
      if (current.element.key !== key) {
        current = current.next;
      } else {
        return current.element;
      }
    }
    return undefined;
  }

  remove(key: any) {
    const hash = this.loseloseHashCode(key); // hash会有冲突
    if (!this.table[hash]) {
      return undefined;
    }
    let linkedList = this.table[hash];
    let current = linkedList.getHead();
    while (current) {
      if (current.element && current.element.key !== key) {
        current = current.next;
      } else {
        linkedList.remove(current.element);
        current.next = undefined;
        return current;
      }
    }
    return undefined;
  }
}

/**
 * 线性散列表
 * 若已存在散列值，则依次加1往后查找直到不存在为止，然后插入
 */
export class HashTableLinearProbingLazy extends HashTable {
  [x: string]: any;

  constructor(toStrFn = defaultToString) {
    super(toStrFn);
  }

  put(key: any, value: any) {
    const hash = this.loseloseHashCode(key);
    if (!this.table[hash]) {
      this.table[hash] = new ValuePair(key, value);
    } else {
      let index = hash + 1;
      while (this.table[index]) {
        index++;
      }
      this.table[index] = new ValuePair(key, value);
    }
    return true;
  }

  get(key: any) {
    const hash = this.loseloseHashCode(key);
    if (!this.table[hash]) {
      return undefined;
    }
    if (this.table[hash].key === key) {
      return this.table[hash];
    } else {
      let index = hash + 1;
      while (this.table[index]) {
        if (this.table[index].key === key) {
          return this.table[index];
        } else {
          index++;
        }
      }
      return undefined;
    }
  }

  remove(key: any) {
    const hash = this.loseloseHashCode(key);
    if (!this.table[hash]) {
      return false;
    }
    if (this.table[hash].key === key) {
      delete this.table[hash];
      this.verifyRemoveSideEffect(key, hash);
      return true;
    } else {
      let index = hash + 1;
      while (this.table[index]) {
        if (this.table[index].key === key) {
          delete this.table[index];
          this.verifyRemoveSideEffect(key, index);
          return true;
        } else {
          index++;
        }
      }
      return false;
    }
  }

  // todo
  verifyRemoveSideEffect(key: any, removePosition: number) {
    const hash = this.loseloseHashCode(key);
    let index = removePosition + 1;
    // 将removePosition后面的元素依次
    while (this.table[index]) {
      const posHash = this.loseloseHashCode(this.table[index].key);
      index++;
    }
  }
}
