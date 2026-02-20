import { last } from "./last.impl";

declare global {
  interface Array<T> {
    /**
     * Returns the last element of the array, or `undefined` if the array is empty.
     * @returns The last element, or undefined if the array is empty
     * @example ["a", "b", "c"].last //=> "c"
     * @example [].last //=> undefined
     */
    readonly last: T | undefined;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the last element of the array, or `undefined` if the array is empty.
     * @returns The last element, or undefined if the array is empty
     * @example ["a", "b", "c"].last //=> "c"
     * @example [].last //=> undefined
     */
    readonly last: T | undefined;
  }
}

Object.defineProperty(Array.prototype, "last", {
  enumerable: false,
  get: function <T>(this: T[]) {
    return last(this);
  },
});
