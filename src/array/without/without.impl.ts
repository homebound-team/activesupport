import { withoutAll } from "src/array/array.impl";

/**
 * Returns a new array with the specified element(s) removed.
 * This does not mutate the original array. Use `remove` for a mutating version.
 * @param arr - The array to filter
 * @param elements - The element(s) to exclude from the new array
 * @returns A new array without the specified element(s)
 * @example
 * without([1, 2, 3, 2], 2)
 * //=> [1, 3]
 * @example
 * without([1, 2, 3], 1, 3)
 * //=> [2]
 * @example
 * without([], 1)
 * //=> []
 */
export function without<T>(arr: readonly T[], ...elements: readonly T[]): T[] {
  return withoutAll(arr, elements);
}
