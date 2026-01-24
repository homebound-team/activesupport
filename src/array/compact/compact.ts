import { isDefined } from "../utils";

declare global {
  interface Array<T> {
    /**
     * Returns a new array with all `null` and `undefined` elements removed.
     * Note that other falsy values (0, false, "") are preserved.
     * @example [0, undefined, 1, false, 2, null].compact() //=> [0, 1, false, 2]
     * @example [null, undefined].compact() //=> []
     */
    compact(): NonNullable<T>[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array with all `null` and `undefined` elements removed.
     * Note that other falsy values (0, false, "") are preserved.
     * @example [0, undefined, 1, false, 2, null].compact() //=> [0, 1, false, 2]
     * @example [null, undefined].compact() //=> []
     */
    compact(): NonNullable<T>[];
  }
}

Array.prototype.compact = function () {
  return this.filter(isDefined);
};
