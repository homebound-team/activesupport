import { CallbackFn } from "src/array/utils";

/**
 * Finds the first element matching the callback and removes it from an array.
 * This mutates the original array.
 * @param arr - The array to search and modify
 * @param fn - A function to test each element
 * @returns The removed element, or undefined if no element matches
 * @example
 * const arr = [1, 2, 3, 4];
 * findAndRemove(arr, n => n === 2)
 * //=> 2, arr is now [1, 3, 4]
 * @example
 * findAndRemove([1, 2, 3], n => n === 5)
 * //=> undefined
 */
export function findAndRemove<T>(arr: T[], fn: CallbackFn<T, boolean>): T | undefined {
  const index = arr.findIndex(fn);
  if (index === -1) return undefined;
  const value = arr[index];
  arr.splice(index, 1);
  return value;
}
