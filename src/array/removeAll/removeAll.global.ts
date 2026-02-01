import { removeAll } from "src/array/removeAll/removeAll.impl";

declare global {
  interface Array<T> {
    /**
     * Removes all specified elements by mutating the array in place.
     * Use `withoutAll` for a non-mutating version that returns a new array.
     * @param elements An array of elements to remove
     * @example const arr = [1, 2, 3, 2, 4]; arr.removeAll([2, 4]); // arr is now [1, 3]
     * @example const arr = []; arr.removeAll([1]); // arr is still []
     */
    removeAll(elements: readonly T[]): void;
  }
}

Array.prototype.removeAll = function <T>(this: T[], elements: readonly T[]) {
  return removeAll(this, elements);
};
