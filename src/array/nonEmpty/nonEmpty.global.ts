import { nonEmpty } from "./nonEmpty.impl";

declare global {
  interface Array<T> {
    /**
     * Returns true if an array contains at least one element.
     * @returns True if the array has one or more elements
     * @example ["a"].nonEmpty //=> true
     * @example [].nonEmpty //=> false
     */
    readonly nonEmpty: boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if an array contains at least one element.
     * @returns True if the array has one or more elements
     * @example ["a"].nonEmpty //=> true
     * @example [].nonEmpty //=> false
     */
    readonly nonEmpty: boolean;
  }
}

Object.defineProperty(Array.prototype, "nonEmpty", {
  enumerable: false,
  get: function <T>(this: T[]) {
    return nonEmpty(this);
  },
});
