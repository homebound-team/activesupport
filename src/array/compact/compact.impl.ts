import { isDefined } from "src/utils";

/**
 * Returns a new array with all `null` and `undefined` elements removed.
 * Note that other falsy values (0, false, "") are preserved.
 * @param arr The array to compact
 * @returns A new array with null and undefined values removed
 * @example compact([0, undefined, 1, false, 2, null]) //=> [0, 1, false, 2]
 * @example compact([null, undefined]) //=> []
 */
export function compact<T>(arr: readonly T[]): NonNullable<T>[] {
  return arr.filter(isDefined) as NonNullable<T>[];
}
