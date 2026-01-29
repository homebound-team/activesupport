export {}; // needed for TS to realize this file can be imported

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
  if (elements.length === 0) return;
  // start from the end of the array so we don't need to worry about re-ordering
  for (let index = this.length - 1; index >= 0; index--) {
    if (elements.includes(this[index])) {
      this.splice(index, 1);
    }
  }
};
