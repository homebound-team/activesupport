import { lastImpl } from "src/array/last/last.impl";

declare global {
  interface Array<T> {
    /**
     * Returns the last element of the array, or `undefined` if the array is empty.
     * @example ["a", "b", "c"].last //=> "c"
     * @example [].last //=> undefined
     */
    last: T | undefined;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the last element of the array, or `undefined` if the array is empty.
     * @example ["a", "b", "c"].last //=> "c"
     * @example [].last //=> undefined
     */
    last: T | undefined;
  }
}

Object.defineProperty(Array.prototype, "last", {
  enumerable: false,
  get: lastImpl,
});
