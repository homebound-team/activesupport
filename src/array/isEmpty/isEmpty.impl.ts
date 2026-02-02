/**
 * Returns true if an array contains no elements.
 * @param arr The array to check
 * @returns True if the array is empty
 * @example isEmpty([]) //=> true
 * @example isEmpty(["a"]) //=> false
 */
export function isEmpty<T>(arr: readonly T[]): boolean {
  return arr.length === 0;
}
