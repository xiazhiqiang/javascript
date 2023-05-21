import { defaultCompare, swap } from "./utils";

// 所有排序实现默认都是由小到大的

/**
 * 冒泡排序
 * 每轮比较相邻两个元素的大小，第一个大于第二个，则交换
 * 每轮比较完之后，会将最大的交换到最后，呈现由小到大的冒泡效果
 */
export function bubbleSort(array: number[], compareFn = defaultCompare) {
  // 执行 n 轮
  for (let i = 0, len = array.length; i < len; i++) {
    // 每轮比较相邻元素的大小，大的交换排后面
    // 每轮执行完后，最大的元素会排在最后
    for (let j = 0; j < len - 1; j++) {
      if (compareFn(array[j], array[j + 1]) > 0) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}

/**
 * 冒泡排序优化
 * 在上一轮交换冒泡完之后，下一轮中的交换比较就可以不包括上轮已经确认的最大值
 */
export function modifiedBubbleSort(
  array: number[],
  compareFn = defaultCompare
) {
  for (let i = 0, len = array.length; i < len; i++) {
    // 优化循环
    for (let j = 0; j < len - 1 - i; j++) {
      if (compareFn(array[j], array[j + 1]) > 0) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}

/**
 * 选择排序
 * 第一轮找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。
 */
export function selectionSort(array: number[], compareFn = defaultCompare) {
  for (let i = 0, len = array.length; i < len - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < len; j++) {
      if (compareFn(array[minIdx], array[j]) > 0) {
        minIdx = j;
      }
    }
    if (i !== minIdx) {
      swap(array, i, minIdx);
    }
  }
  return array;
}

/**
 * 插入排序
 * 假定第一项已经排序了。 接着，它和第二项进行比较——第二项是应该待在原位还是插到第一项之前呢？这样， 头两项就已正确排序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢） ，以此类推。
 */
export function insertionSort(array: number[], compareFn = defaultCompare) {
  let temp;
  for (let i = 1, len = array.length; i < len; i++) {
    let j = i;
    temp = array[i];
    while (j > 0 && compareFn(array[j - 1], temp) > 0) {
      array[j] = array[j - 1]; // 依次向右移动
      j--;
    }
    array[j] = temp;
  }
  return array;
}

/**
 * 归并排序，稳定
 * 思想是将原始数组切分成较小的数组， 直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
 */
export function mergeSort(array: number[], compareFn = defaultCompare) {
  if (array.length <= 1) {
    return array;
  }
  const middle = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, middle), compareFn);
  const right = mergeSort(array.slice(middle), compareFn);

  // 将排序好的left和right进行合并
  let i = 0,
    j = 0,
    result: number[] = [];
  while (i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[j]) > 0 ? right[j++] : left[i++]);
  }
  // 考虑left或right有一边先遍历完，剩余的没有遍历完的直接追加到后面，因为left 和 right已经是大小排序过的了
  result.concat(i < left.length ? left.slice(i) : right.slice(j));

  return result;
}

/**
 * 快速排序，不稳定
 */
export function quickSort(
  array: number[],
  start = 0,
  end = array.length - 1,
  compareFn = defaultCompare
): number[] {
  if (array.length <= 1) {
    return array;
  }
  // 从数组中选出划分参照值，然后将数组划分成左侧都小于参照值，右侧都大于参照值
  const pivot = array[Math.floor(array.length / 2)];
  let i = start,
    j = end;
  while (i <= j) {
    while (compareFn(array[i], array[pivot]) < 0) {
      i++;
    }
    while (compareFn(array[j], array[pivot]) > 0) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }

  // 继续排序左侧和右侧
  quickSort(array, start, i - 1, compareFn);
  quickSort(array, i, end, compareFn);
  return array;
}

/**
 * 快速排序，不稳定，另一种简单实现
 */
export function quickSort2(
  array: number[],
  start = 0,
  end = array.length - 1,
  compareFn = defaultCompare
) {
  // 从数组中选出划分参照值，然后将数组划分成左侧都小于参照值，右侧都大于参照值
  let i = start,
    j = start,
    pivot = array[end];
  while (i <= end) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
    i++;
  }

  const idx = j - 1;

  // 继续排序左侧和右侧
  quickSort(array, start, idx - 1, compareFn);
  quickSort(array, idx + 1, end, compareFn);
  return array;
}

/**
 * 计数排序
 */
export function countingSort(array: number[], compareFn = defaultCompare) {}

/**
 * 桶排序，默认桶大小为5
 * 思路：通过分桶，将值归类，然后再对每个桶中进行排序后，拼接每个桶
 * 不常用，可以借鉴思路处理其他问题
 */
export function bucketSort(
  array: number[],
  bucketSize = 5,
  compareFn = defaultCompare
) {
  if (array.length < 2) {
    return array;
  }

  // 找到数组中最大值和最小值
  let min = array[0];
  let max = array[0];
  for (let i = 0, len = array.length; i < len; i++) {
    if (array[i] > max) {
      max = array[i];
    }
    if (array[i] < min) {
      min = array[i];
    }
  }

  // 根据最大值和最小值以及桶大小，计算需要的分桶个数
  const bucketCount = Math.ceil((max - min) / bucketSize);
  const buckets: any = [];
  // 初始化每个桶
  for (let i = 0, len = bucketCount; i < len; i++) {
    buckets[i] = [];
  }

  // 循环数组，每个元素分桶
  for (let i = 0, len = array.length; i < len; i++) {
    // 根据值选择放到哪个桶中
    const bucketIndex = Math.floor((array[i] - min) / bucketSize);
    buckets[bucketIndex].push(array[i]);
  }

  // 每个桶排序
  const sortedRet: any = [];
  for (let i = 0; i < bucketCount; i++) {
    insertionSort(buckets[i], compareFn);
    sortedRet.concat(buckets[i]);
  }

  return sortedRet;
}
