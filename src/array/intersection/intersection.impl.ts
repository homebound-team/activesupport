/**
 * Returns a new array containing elements present in both arrays.
 * @param other The array to compare against
 * @returns Array containing elements present in both arrays
 * @example [1, 2, 3, 4].intersection([3, 4, 5, 6]) //=> [3, 4]
 * @example [1, 2].intersection([3, 4]) //=> []
 * @example [].intersection([1, 2]) //=> []
 */
export function intersection<T>(arr: readonly T[], other: readonly T[]): T[] {
  return [...new Set(arr).intersection(new Set(other))];
}
