import { LinkedList } from "./linked-list";
import { defaultEqual, defaultCompare, Node } from "./utils";

/**
 * 有序链表
 */
export class SortedLinkedList extends LinkedList {
  [x: string]: any;

  constructor(equalsFn = defaultEqual, compareFn = defaultCompare) {
    super(equalsFn);
    this.compareFn = compareFn;
  }

  getIndexNextSortedElement(element: any) {
    let current = this.head,
      i = 0;
    while (current) {
      if (this.compareFn(current.element, element) < 0) {
        current = current.next;
        i++;
      } else {
        return i;
      }
    }

    return i;
  }

  insert(element: any) {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }
    const idx = this.getIndexNextSortedElement(element);
    return super.insert(element, idx);
  }
}

export const sortedLinkedListUsage = () => {
  console.log("\nsortedLinkedList usage:");
  const sortedLinkedList = new SortedLinkedList();

  sortedLinkedList.push("Jack");
  console.log("sortedLinkedList:", sortedLinkedList.toString());
};
