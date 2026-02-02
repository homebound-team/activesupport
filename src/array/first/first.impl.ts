/**
 * Returns the first element of the array, or `undefined` if the array is empty.
 * @example ["a", "b", "c"].first //=> "a"
 * @example [].first //=> undefined
 */
export function first<T>(arr: readonly T[]): T | undefined {
  return arr.length === 0 ? undefined : arr[0];
}
