/**
 * Splits an array into chunks of a specified size.
 * The final chunk may contain fewer elements if the array length is not evenly divisible.
 * @param arr The array to split into batches
 * @param n The size of each batch
 * @returns An array of arrays, each containing up to n elements
 * @example batched([1, 2, 3, 4, 5, 6], 3) //=> [[1, 2, 3], [4, 5, 6]]
 * @example batched([1, 2, 3, 4, 5], 2) //=> [[1, 2], [3, 4], [5]]
 * @example batched([], 3) //=> []
 */
export function batched<T>(arr: readonly T[], n: number): T[][] {
  const numArrays = Math.ceil(arr.length / n);
  const result = new Array<T[]>(numArrays);
  let offset = 0;
  for (let i = 0; i < numArrays; i++) {
    result[i] = arr.slice(offset, offset + n);
    offset += n;
  }
  return result;
}
