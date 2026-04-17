/**
 * Removes all specified elements from an array by mutating it in place.
 * Use `withoutAll` for a non-mutating version that returns a new array.
 * @param arr - The array to modify
 * @param elements - An array of elements to remove
 * @example
 * const arr = [1, 2, 3, 2, 4];
 * removeAll(arr, [2, 4]);
 * // arr is now [1, 3]
 * @example
 * const arr = [];
 * removeAll(arr, [1]);
 * // arr is still []
 */
export function removeAll<T>(arr: T[], elements: readonly T[]): void {
  if (arr.length === 0 || elements.length === 0) return;
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!elements.includes(arr[i])) {
      // Shift elements that don't need to be removed towards the start of the array by the number of elements we've
      // already removed.  Skip if we haven't removed anything yet.
      if (index !== i) arr[index] = arr[i];
      index++;
    }
  }
  arr.length = index;
}
