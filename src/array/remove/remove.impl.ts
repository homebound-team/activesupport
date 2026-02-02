import { removeAll } from "src/array/removeAll/removeAll.impl";

/**
 * Removes the specified element(s) by mutating the array in place.
 * Use `without` for a non-mutating version that returns a new array.
 * @param element The element(s) to remove from the array
 * @example const arr = [1, 2, 3, 2]; arr.remove(2); // arr is now [1, 3]
 * @example const arr = [1, 2, 3]; arr.remove(1, 3); // arr is now [2]
 */
export function remove<T>(arr: T[], ...elements: readonly T[]) {
  removeAll(arr, elements);
}
