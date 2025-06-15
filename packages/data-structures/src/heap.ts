import { defaultCompare, swap } from "./utils";

/**
 * 最小二叉堆
 * 父节点比子节点小
 */
export class MinHeap {
  [x: string]: any;

  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  getParentIndex(index: number) {
    if (index === 0) {
      return 0;
    } else {
      return Math.floor((index - 1) / 2);
    }
  }

  insert(value: any) {
    if (!value) {
      return;
    }
    this.heap.push(value);
    this.siftUp(this.heap.length - 1); // 从最后的元素开始向上递归交换，直到符合最小堆
  }

  // 将这个值和它的父节点进行交换，直到父节点小于这个插入的值。
  siftUp(index: number) {
    let parent = this.getParentIndex(index);
    if (this.compareFn(this.heap[parent], this.heap[index]) > 0) {
      // 递归交换
      swap(this.heap, parent, index);
      this.siftUp(parent);
    }
  }

  // 将父节点与子节点比较，若父节点大于子节点，则交换，直到符合最小堆
  siftDown(index: number) {
    const leftIdx = this.getLeftIndex(index);
    const rightIdx = this.getRightIndex(index);
    const size = this.size();
    let idx = index;
    if (
      leftIdx < size &&
      this.compareFn(this.heap[index], this.heap[leftIdx]) > 0
    ) {
      idx = leftIdx;
    }
    if (
      rightIdx < size &&
      this.compareFn(this.heap[index], this.heap[rightIdx]) > 0
    ) {
      idx = rightIdx;
    }

    if (idx !== index) {
      swap(this.heap, index, idx);
      // 递归交换
      this.siftDown(idx);
    }
  }

  /**
   * 移除根节点
   */
  extract() {
    if (this.isEmpty()) {
      return;
    }
    if (this.size() === 1) {
      const ret = this.heap[0];
      this.heap = [];
      return ret;
    }
    const removeValue = this.heap.shift();
    this.siftDown(0); // 从根节点开始递归交换，直到符合最小堆
    return removeValue;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length <= 0;
  }

  findMinimum() {
    // 最小堆，根节点即为最小值
    return this.heap[0];
  }
}

/**
 * 最大堆，与最小堆的差别就是在节点值的比较上，其他无差别
 */
export class MaxHeap extends MinHeap {
  [x: string]: any;

  constructor(compareFn = defaultCompare) {
    const reverseCompareFn = (
      (f) => (a: any, b: any) =>
        f(b, a)
    )(compareFn);
    super(reverseCompareFn);
  }
}

// 最大堆和最小堆由 compareFn 决定，默认最小堆
export function heapSort(array: [], compareFn = defaultCompare) {
  let size = array.length;
  buildMaxHeap(array, compareFn); // 递归交换调整成最大堆/最小堆
  while (size > 1) {
    swap(array, 0, size - 1);
    size--;
    heapify(array, 0, size, compareFn); // 递归堆化
  }
}

// 只需要对后半部分数组执行 heapify（下移）函数（前半部分会被自动排好序，所以不需要对已经知道排好序的部分执行函数）
export function buildMaxHeap(array: any[], compareFn: any) {
  for (let len = array.length, i = Math.floor(len / 2); i >= 0; i--) {
    heapify(array, i, len, compareFn);
  }
}

// 同siftDown
export function heapify(
  array: any[],
  index: number,
  size: number,
  compareFn: any
) {
  const leftIdx = 2 * index + 1;
  const rightIdx = 2 * index + 2;
  let idx = index;
  if (leftIdx < size && compareFn(array[index], array[leftIdx]) > 0) {
    idx = leftIdx;
  }
  if (rightIdx < size && compareFn(array[index], array[rightIdx]) > 0) {
    idx = rightIdx;
  }

  if (idx !== index) {
    swap(array, index, idx);
    // 递归交换
    heapify(array, idx, size, compareFn);
  }
}
