import { difference } from "./difference.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array containing elements that are present in the first array but not in the second.
     * @param other The array of elements to exclude
     * @returns A new array containing elements that exist only in the first array
     * @example [1, 2, 3].difference([2, 3, 4]) //=> [1]
     * @example [1, 2].difference([3, 4]) //=> [1, 2]
     * @example [].difference([1, 2]) //=> []
     */
    difference(other: T[]): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array containing elements that are present in the first array but not in the second.
     * @param other The array of elements to exclude
     * @returns A new array containing elements that exist only in the first array
     * @example [1, 2, 3].difference([2, 3, 4]) //=> [1]
     * @example [1, 2].difference([3, 4]) //=> [1, 2]
     * @example [].difference([1, 2]) //=> []
     */
    difference(other: T[]): T[];
  }
}

Array.prototype.difference = function <T>(this: T[], other: T[]): T[] {
  return difference(this, other);
};
