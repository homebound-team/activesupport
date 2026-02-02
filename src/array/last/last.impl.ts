/**
 * Returns the last element of the array, or `undefined` if the array is empty.
 * @example ["a", "b", "c"].last //=> "c"
 * @example [].last //=> undefined
 */
export function last<T>(arr: readonly T[]): T | undefined {
  return arr.length === 0 ? undefined : arr[arr.length - 1];
}
