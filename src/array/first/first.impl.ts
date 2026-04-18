/**
 * Returns the first element of an array, or `undefined` if the array is empty.
 * @param arr - The array to get the first element from
 * @returns The first element, or undefined if the array is empty
 * @example
 * first(["a", "b", "c"])
 * //=> "a"
 * @example
 * first([])
 * //=> undefined
 */
export function first<T>(arr: readonly T[]): T | undefined {
  return arr.length === 0 ? undefined : arr[0];
}
