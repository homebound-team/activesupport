export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Removes the specified element(s) by mutating the array in place.
     * Use `without` for a non-mutating version that returns a new array.
     * @param element The element(s) to remove from the array
     * @example const arr = [1, 2, 3, 2]; arr.remove(2); // arr is now [1, 3]
     * @example const arr = [1, 2, 3]; arr.remove(1, 3); // arr is now [2]
     */
    remove(element: T): void;
    /**
     * Removes the specified element(s) by mutating the array in place.
     * Use `without` for a non-mutating version that returns a new array.
     * @param elements The element(s) to remove from the array
     * @example const arr = [1, 2, 3, 2]; arr.remove(2); // arr is now [1, 3]
     * @example const arr = [1, 2, 3]; arr.remove(1, 3); // arr is now [2]
     */
    remove(...elements: readonly T[]): void;
  }
}

Array.prototype.remove = function <T>(this: T[], ...elements: readonly T[]) {
  this.removeAll(elements);
};
