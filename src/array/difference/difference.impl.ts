/**
 * Returns a new array containing elements that are present in the first array but not in the second.
 * @param arr - The array to filter
 * @param other - The array of elements to exclude
 * @returns A new array containing elements that exist only in the first array
 * @example
 * difference([1, 2, 3], [2, 3, 4])
 * //=> [1]
 * @example
 * difference([1, 2], [3, 4])
 * //=> [1, 2]
 * @example
 * difference([], [1, 2])
 * //=> []
 */
export function difference<T>(arr: readonly T[], other: T[]): T[] {
  return [...new Set(arr).difference(new Set(other))];
}
