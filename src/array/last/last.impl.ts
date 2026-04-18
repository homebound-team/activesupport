/**
 * Returns the last element of an array, or `undefined` if the array is empty.
 * @param arr - The array to get the last element from
 * @returns The last element, or undefined if the array is empty
 * @example
 * last(["a", "b", "c"])
 * //=> "c"
 * @example
 * last([])
 * //=> undefined
 */
export function last<T>(arr: readonly T[]): T | undefined {
  return arr.length === 0 ? undefined : arr[arr.length - 1];
}
