/**
 * Returns true if the array contains no elements.
 * @example [].isEmpty //=> true
 * @example ["a"].isEmpty //=> false
 */
export function isEmpty<T>(arr: readonly T[]): boolean {
  return arr.length === 0;
}
