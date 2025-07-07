declare global {
  interface Array<T> {
    /**
     * Returns `true` if `this` and `other` have exactly the same elements.
     *
     * Order doesn't matter, duplicates are not allowed (treated as a difference).
     */
    hasSameElements(other: readonly T[]): boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns `true` if `this` and `other` have exactly the same elements.
     *
     * Order doesn't matter, duplicates are not allowed (treated as a difference).
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
