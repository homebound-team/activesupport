import { first } from "./first.impl";

declare global {
  interface Array<T> {
    /**
     * Returns the first element of the array, or `undefined` if the array is empty.
     * @returns The first element, or undefined if the array is empty
     * @example ["a", "b", "c"].first //=> "a"
     * @example [].first //=> undefined
     */
    readonly first: T | undefined;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the first element of the array, or `undefined` if the array is empty.
     * @returns The first element, or undefined if the array is empty
     * @example ["a", "b", "c"].first //=> "a"
     * @example [].first //=> undefined
     */
    readonly first: T | undefined;
  }
}

Object.defineProperty(Array.prototype, "first", {
  enumerable: false,
  get: function <T>(this: T[]) {
    return first(this);
  },
});
