import { withoutAll } from "src/array/array.impl";

/**
 * Returns a new array with the specified element(s) removed.
 * This does not mutate the original array. Use `remove` for a mutating version.
 * @param element The element(s) to exclude from the new array
 * @returns A new array without the specified element(s)
 * @example [1, 2, 3, 2].without(2) //=> [1, 3]
 * @example [1, 2, 3].without(1, 3) //=> [2]
 * @example [].without(1) //=> []
 */
export function without<T>(arr: readonly T[], ...elements: readonly T[]): T[] {
  return withoutAll(arr, elements);
}
