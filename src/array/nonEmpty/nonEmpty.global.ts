import { nonEmpty } from "src/array/nonEmpty/nonEmpty.impl";

declare global {
  interface Array<T> {
    /**
     * Returns true if the array contains at least one element.
     * @example ["a"].nonEmpty //=> true
     * @example [].nonEmpty //=> false
     */
    nonEmpty: boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if the array contains at least one element.
     * @example ["a"].nonEmpty //=> true
     * @example [].nonEmpty //=> false
     */
    nonEmpty: boolean;
  }
}

Object.defineProperty(Array.prototype, "nonEmpty", {
  enumerable: false,
  get: function <T>(this: T[]) {
    return nonEmpty(this);
  },
});
