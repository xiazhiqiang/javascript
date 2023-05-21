import { defaultCompare } from "./utils";

/**
 * 二分法查找
 */
export const binarySearchRecursive = (
  array: number[],
  value: any,
  low: number,
  high: number,
  compareFn = defaultCompare
): any => {
  if (low > high) {
    return -1;
  }

  const mid = Math.floor((high + low) / 2);
  if (compareFn(value, array[mid]) > 0) {
    return binarySearchRecursive(array, value, mid + 1, high, compareFn);
  } else if (compareFn(value, array[mid]) < 0) {
    return binarySearchRecursive(array, value, low, mid - 1, compareFn);
  } else {
    return mid;
  }
};
