import { isDefined } from "src/utils";

/**
 * Returns a new array with all `null` and `undefined` elements removed.
 * Note that other falsy values (0, false, "") are preserved.
 * @example [0, undefined, 1, false, 2, null].compact() //=> [0, 1, false, 2]
 * @example [null, undefined].compact() //=> []
 */
export function compact<T>(arr: readonly T[]): NonNullable<T>[] {
  return arr.filter(isDefined) as NonNullable<T>[];
}
