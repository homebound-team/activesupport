import { hasSameElements } from "src/array/hasSameElements/hasSameElements.impl";

/**
 * Returns true if the arrays have different elements (ignoring order).
 * Treats duplicates strictly - arrays with different duplicate counts are considered different.
 * @param other The array to compare against
 * @returns True if the arrays have different elements
 * @example [1, 2, 3].notSameElements([3, 2, 1]) //=> false
 * @example [1, 2, 3].notSameElements([1, 2, 4]) //=> true
 * @example [1, 1, 2].notSameElements([1, 2]) //=> true
 */
export function notSameElements<T>(arr: readonly T[], other: readonly T[]): boolean {
  return !hasSameElements(arr, other);
}
