import { defaultToString, ValuePair } from "./utils";
/**
 * 字典
 */
export class Dictionary {
  [x: string]: any;

  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  set(key: any, value: any) {
    this.table[this.toStrFn(key)] = new ValuePair(key, value);
  }

  remove(key: string) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  hasKey(key: string) {
    return (
      Object.keys(this.table).find(
        (k) => this.toStrFn(k) === this.toStrFn(key)
      ) !== undefined
    );
  }

  get(key: string) {
    return this.table[this.toStrFn(key)].value;
  }

  clear() {
    this.table = {};
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() <= 0;
  }

  keys() {
    return this.keysValues().map((i: any) => i.key);
  }

  values() {
    return this.keysValues().map((i: any) => i.value);
  }

  keysValues() {
    return Object.values(this.table);
  }

  forEach(callbackFn: (arg0: string, arg1: any) => any) {
    const keys = this.keys();
    for (let i = 0, len = keys.length; i < len; i++) {
      if (!callbackFn(keys[i], this.table[keys[i]])) {
        return;
      }
    }
  }

  toString() {
    const valuePairs = this.keysValues();
    const ret: any[] = [];
    valuePairs.forEach((i: any) => {
      ret.push(i.toString());
    });
    return ret.join(",");
  }
}

export const dictionaryUsage = () => {
  console.log("\ndictionary usage:");
  const dictionary = new Dictionary();

  console.log("dictionary: ", dictionary.values());
};
