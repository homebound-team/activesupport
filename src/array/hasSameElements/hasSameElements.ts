declare global {
  interface Array<T> {
    /**
     * Returns true if the arrays have exactly the same elements (ignoring order).
     * Treats duplicates strictly - arrays must have the same element counts to be considered equal.
     * @param other The array to compare against
     * @returns True if the arrays have the same elements
     * @example [1, 2, 3].hasSameElements([3, 2, 1]) //=> true
     * @example [1, 2, 3].hasSameElements([1, 2, 4]) //=> false
     * @example [1, 1, 2].hasSameElements([1, 2]) //=> false
     */
    hasSameElements(other: readonly T[]): boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if the arrays have exactly the same elements (ignoring order).
     * Treats duplicates strictly - arrays must have the same element counts to be considered equal.
     * @param other The array to compare against
     * @returns True if the arrays have the same elements
     * @example [1, 2, 3].hasSameElements([3, 2, 1]) //=> true
     * @example [1, 2, 3].hasSameElements([1, 2, 4]) //=> false
     * @example [1, 1, 2].hasSameElements([1, 2]) //=> false
     */
    hasSameElements(other: readonly T[]): boolean;
  }
}

Array.prototype.hasSameElements = function <T>(this: T[], other: readonly T[]): boolean {
  if (this.length !== other.length) return false;
  // Under 25 elements just do the linear scan / O(n^2) version
  if (this.length <= 25 && other.length <= 25) {
    return hasSameSmall(this, other);
  } else {
    return hasSameLarge(this, other);
  }
};

export function hasSameSmall<T>(a: T[], b: readonly T[]): boolean {
  if (a.length !== b.length) return false;
  // We make a copy and remove matches as we go, to handle repeated elements/duplicates
  const otherCopy = [...b];
  for (let i = 0; i < a.length; i++) {
    const item = a[i];
    const index = otherCopy.indexOf(item);
    if (index === -1) return false;
    otherCopy.splice(index, 1);
  }
  return true;
}

// Use map approach for larger arrays
export function hasSameLarge<T>(a: T[], b: readonly T[]): boolean {
  const map = new Map();
  for (const item of a) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  for (const item of b) {
    const count = map.get(item);
    if (!count) return false;
    if (count === 1) {
      map.delete(item);
    } else {
      map.set(item, count - 1);
    }
  }
  return map.size === 0;
}
