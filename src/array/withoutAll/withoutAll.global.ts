import { withoutAll } from "./withoutAll.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array with all specified elements removed.
     * Similar to `without`, but takes the array of elements to remove instead of variadic arguments.
     * @param elements An array of elements to exclude from the new array
     * @returns A new array without the specified elements
     * @example [1, 2, 3, 2, 4].withoutAll([2, 4]) //=> [1, 3]
     * @example [].withoutAll([1]) //=> []
     */
    withoutAll(elements: readonly T[]): Array<T>;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array with all specified elements removed.
     * Similar to `without`, but takes the array of elements to remove instead of variadic arguments.
     * @param elements An array of elements to exclude from the new array
     * @returns A new array without the specified elements
     * @example [1, 2, 3, 2, 4].withoutAll([2, 4]) //=> [1, 3]
     * @example [].withoutAll([1]) //=> []
     */
    withoutAll(elements: readonly T[]): Array<T>;
  }
}

Array.prototype.withoutAll = function <T>(this: T[], elements: readonly T[]): Array<T> {
  return withoutAll(this, elements);
};
