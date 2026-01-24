import { hasSameLarge, hasSameSmall } from "./hasSameElements";

declare global {
  interface Array<T> {
    /**
     * Returns true if the arrays have different elements (ignoring order).
     * Treats duplicates strictly - arrays with different duplicate counts are considered different.
     * @param other The array to compare against
     * @returns True if the arrays have different elements
     * @example [1, 2, 3].notSameElements([3, 2, 1]) //=> false
     * @example [1, 2, 3].notSameElements([1, 2, 4]) //=> true
     * @example [1, 1, 2].notSameElements([1, 2]) //=> true
     */
    notSameElements(other: readonly T[]): boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if the arrays have different elements (ignoring order).
     * Treats duplicates strictly - arrays with different duplicate counts are considered different.
     * @param other The array to compare against
     * @returns True if the arrays have different elements
     * @example [1, 2, 3].notSameElements([3, 2, 1]) //=> false
     * @example [1, 2, 3].notSameElements([1, 2, 4]) //=> true
     * @example [1, 1, 2].notSameElements([1, 2]) //=> true
     */
    notSameElements(other: readonly T[]): boolean;
  }
}

Array.prototype.notSameElements = function <T>(this: T[], other: readonly T[]): boolean {
  if (this.length !== other.length) return true;
  // Under 25 elements just do the linear scan / O(n^2) version
  if (this.length <= 25 && other.length <= 25) {
    return !hasSameSmall(this, other);
  } else {
    return !hasSameLarge(this, other);
  }
};
