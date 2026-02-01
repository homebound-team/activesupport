import { intersection } from "src/array/intersection/intersection.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array containing elements present in both arrays.
     * @param other The array to compare against
     * @returns Array containing elements present in both arrays
     * @example [1, 2, 3, 4].intersection([3, 4, 5, 6]) //=> [3, 4]
     * @example [1, 2].intersection([3, 4]) //=> []
     * @example [].intersection([1, 2]) //=> []
     */
    intersection(other: T[]): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array containing elements present in both arrays.
     * @param other The array to compare against
     * @returns Array containing elements present in both arrays
     * @example [1, 2, 3, 4].intersection([3, 4, 5, 6]) //=> [3, 4]
     * @example [1, 2].intersection([3, 4]) //=> []
     * @example [].intersection([1, 2]) //=> []
     */
    intersection(other: readonly T[]): readonly T[];
  }
}

Array.prototype.intersection = function <T>(this: T[], other: T[]) {
  return intersection(this, other);
};
