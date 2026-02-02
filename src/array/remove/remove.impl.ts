import { removeAll } from "src/array/removeAll/removeAll.impl";

/**
 * Removes the specified element(s) from an array by mutating it in place.
 * Use `without` for a non-mutating version that returns a new array.
 * @param arr The array to modify
 * @param elements The element(s) to remove from the array
 * @example const arr = [1, 2, 3, 2]; remove(arr, 2); // arr is now [1, 3]
 * @example const arr = [1, 2, 3]; remove(arr, 1, 3); // arr is now [2]
 */
export function remove<T>(arr: T[], ...elements: readonly T[]) {
  removeAll(arr, elements);
}
