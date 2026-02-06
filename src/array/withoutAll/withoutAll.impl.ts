import { removeAll } from "src/array/removeAll/removeAll.impl";

/**
 * Returns a new array with all specified elements removed.
 * Similar to `without`, but takes an array of elements to remove instead of variadic arguments.
 * @param arr - The array to filter
 * @param elements - An array of elements to exclude from the new array
 * @returns A new array without the specified elements
 * @example
 * withoutAll([1, 2, 3, 2, 4], [2, 4])
 * //=> [1, 3]
 * @example
 * withoutAll([], [1])
 * //=> []
 */
export function withoutAll<T>(arr: readonly T[], elements: readonly T[]): Array<T> {
  const result = [...arr];
  removeAll(result, elements);
  return result;
}
