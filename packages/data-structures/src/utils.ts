export const print = function (msg: string, ...p: any[]) {
  console.log(msg, ...p);
};

export class Node {
  [x: string]: any;

  constructor(element: any, next: any = undefined) {
    this.element = element;
    this.next = next || undefined;
  }
}

export class DoubleNode extends Node {
  [x: string]: any;

  constructor(element: any, prev: any = undefined, next: any = undefined) {
    super(element, next);
    this.prev = prev || undefined;
  }
}

export function defaultEqual(a: any, b: any) {
  return a === b;
}

export function defaultCompare(a: any, b: any) {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

export function defaultToString(item: any) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

export class ValuePair {
  [x: string]: any;

  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `${this.key}=${this.value}`;
  }
}

export class TreeNode {
  [x: string]: any;

  constructor(key: any) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export function swap(array: any[], a: number, b: number) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
  return array;
}

export const Colors = { WHITE: 0, GREY: 1, BLACK: 2 };
