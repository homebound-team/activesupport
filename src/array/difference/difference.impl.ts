/**
 * Returns a new array containing elements that are present in the current array but not in the provided array.
 * @param other The array to compare against
 * @returns A new array containing elements that exist only in the current array
 * @example [1, 2, 3].difference([2, 3, 4]) //=> [1]
 * @example [1, 2].difference([3, 4]) //=> [1, 2]
 * @example [].difference([1, 2]) //=> []
 */
export function difference<T>(arr: readonly T[], other: T[]): T[] {
  return [...new Set(arr).difference(new Set(other))];
}
