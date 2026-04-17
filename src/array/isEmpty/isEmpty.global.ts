import { isEmpty } from "./isEmpty.impl";

declare global {
  interface Array<T> {
    /**
     * Returns true if an array contains no elements.
     * @returns True if the array is empty
     * @example [].isEmpty //=> true
     * @example ["a"].isEmpty //=> false
     */
    readonly isEmpty: boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if an array contains no elements.
     * @returns True if the array is empty
     * @example [].isEmpty //=> true
     * @example ["a"].isEmpty //=> false
     */
    readonly isEmpty: boolean;
  }
}

Object.defineProperty(Array.prototype, "isEmpty", {
  enumerable: false,
  get: function <T>(this: T[]) {
    return isEmpty(this);
  },
});
