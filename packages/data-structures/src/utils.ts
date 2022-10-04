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

export const equal = function (a: any, b: any) {
  return a === b;
};
