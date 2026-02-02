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
  const result = [] as T[][];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}
