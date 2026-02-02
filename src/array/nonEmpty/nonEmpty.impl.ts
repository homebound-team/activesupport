/**
 * Returns true if the array contains at least one element.
 * @example ["a"].nonEmpty //=> true
 * @example [].nonEmpty //=> false
 */
export function nonEmpty<T>(arr: readonly T[]): boolean {
  return arr.length > 0;
}
