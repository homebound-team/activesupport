/**
 * Returns true if an array contains at least one element.
 * @param arr The array to check
 * @returns True if the array has one or more elements
 * @example nonEmpty(["a"]) //=> true
 * @example nonEmpty([]) //=> false
 */
export function nonEmpty<T>(arr: readonly T[]): boolean {
  return arr.length > 0;
}
