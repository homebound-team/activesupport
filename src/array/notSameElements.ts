import { hasSameLarge, hasSameSmall } from "./hasSameElements";

declare global {
  interface Array<T> {
    /**
     * Returns `true` if `this` and `other` have different elements.
     *
     * Order doesn't matter, duplicates are not allowed (treated as a difference).
     */
    notSameElements(other: readonly T[]): boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns `true` if `this` and `other` have different elements.
     *
     * Order doesn't matter, duplicates are not allowed (treated as a difference).
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
