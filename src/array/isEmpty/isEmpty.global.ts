import { isEmptyImpl } from "src/array/isEmpty/isEmpty.impl";

declare global {
  interface Array<T> {
    /**
     * Returns true if the array contains no elements.
     * @example [].isEmpty //=> true
     * @example ["a"].isEmpty //=> false
     */
    isEmpty: boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if the array contains no elements.
     * @example [].isEmpty //=> true
     * @example ["a"].isEmpty //=> false
     */
    isEmpty: boolean;
  }
}

Object.defineProperty(Array.prototype, "isEmpty", {
  enumerable: false,
  get: isEmptyImpl,
});
