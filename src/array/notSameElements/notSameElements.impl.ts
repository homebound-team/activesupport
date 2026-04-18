import { hasSameElements } from "src/array/hasSameElements/hasSameElements.impl";

/**
 * Returns true if two arrays have different elements (ignoring order).
 * Treats duplicates strictly - arrays with different duplicate counts are considered different.
 * @param arr - The first array to compare
 * @param other - The second array to compare
 * @returns True if the arrays have different elements
 * @example
 * notSameElements([1, 2, 3], [3, 2, 1])
 * //=> false
 * @example
 * notSameElements([1, 2, 3], [1, 2, 4])
 * //=> true
 * @example
 * notSameElements([1, 1, 2], [1, 2])
 * //=> true
 */
export function notSameElements<T>(arr: readonly T[], other: readonly T[]): boolean {
  return !hasSameElements(arr, other);
}
