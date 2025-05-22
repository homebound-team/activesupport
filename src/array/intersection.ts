export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Returns a new array containing elements present in both arrays
     * @param other The array to compare against
     * @returns Array containing elements present in both arrays
     * @example [1, 2, 3, 4].intersection([3, 4, 5, 6]) //=> [3, 4]
     */
    intersection(other: T[]): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array containing elements present in both arrays
     * @param other The array to compare against
     * @returns Array containing elements present in both arrays
     * @example [1, 2, 3, 4].intersection([3, 4, 5, 6]) //=> [3, 4]
     */
    intersection(other: readonly T[]): readonly T[];
  }
}

Array.prototype.intersection = function <T>(this: T[], other: T[]): T[] {
  return [...new Set(this).intersection(new Set(other))];
};
