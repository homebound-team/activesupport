export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Returns a new array with all specified elements removed.
     * Similar to `without`, but takes an array of elements to remove instead of variadic arguments.
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
     * Similar to `without`, but takes an array of elements to remove instead of variadic arguments.
     * @param elements An array of elements to exclude from the new array
     * @returns A new array without the specified elements
     * @example [1, 2, 3, 2, 4].withoutAll([2, 4]) //=> [1, 3]
     * @example [].withoutAll([1]) //=> []
     */
    withoutAll(elements: T[]): Array<T>;
  }
}

Array.prototype.withoutAll = function <T>(this: T[], elements: T[]): Array<T> {
  const result = [...this];
  result.removeAll(elements);
  return result;
};
