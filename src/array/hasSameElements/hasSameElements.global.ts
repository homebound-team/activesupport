import { hasSameElements } from "./hasSameElements.impl";

declare global {
  interface Array<T> {
    /**
     * Returns true if two arrays have exactly the same elements (ignoring order).
     * Treats duplicates strictly - arrays must have the same element counts to be considered equal.
     * @param other The second array to compare
     * @returns True if the arrays have the same elements
     * @example [1, 2, 3].hasSameElements([3, 2, 1]) //=> true
     * @example [1, 2, 3].hasSameElements([1, 2, 4]) //=> false
     * @example [1, 1, 2].hasSameElements([1, 2]) //=> false
     */
    hasSameElements(other: readonly T[]): boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if two arrays have exactly the same elements (ignoring order).
     * Treats duplicates strictly - arrays must have the same element counts to be considered equal.
     * @param other The second array to compare
     * @returns True if the arrays have the same elements
     * @example [1, 2, 3].hasSameElements([3, 2, 1]) //=> true
     * @example [1, 2, 3].hasSameElements([1, 2, 4]) //=> false
     * @example [1, 1, 2].hasSameElements([1, 2]) //=> false
     */
    hasSameElements(other: readonly T[]): boolean;
  }
}

Array.prototype.hasSameElements = function <T>(this: T[], other: readonly T[]): boolean {
  return hasSameElements(this, other);
};
