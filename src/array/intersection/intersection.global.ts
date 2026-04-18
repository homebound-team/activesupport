import { intersection } from "./intersection.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array containing elements present in both arrays.
     * @param other The second array to compare against
     * @returns An array containing elements present in both arrays
     * @example [1, 2, 3, 4].intersection([3, 4, 5, 6]) //=> [3, 4]
     * @example [1, 2].intersection([3, 4]) //=> []
     * @example [].intersection([1, 2]) //=> []
     */
    intersection(other: readonly T[]): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array containing elements present in both arrays.
     * @param other The second array to compare against
     * @returns An array containing elements present in both arrays
     * @example [1, 2, 3, 4].intersection([3, 4, 5, 6]) //=> [3, 4]
     * @example [1, 2].intersection([3, 4]) //=> []
     * @example [].intersection([1, 2]) //=> []
     */
    intersection(other: readonly T[]): T[];
  }
}

Array.prototype.intersection = function <T>(this: T[], other: readonly T[]): T[] {
  return intersection(this, other);
};
