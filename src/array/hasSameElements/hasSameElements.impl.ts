/**
 * Returns true if two arrays have exactly the same elements (ignoring order).
 * Treats duplicates strictly - arrays must have the same element counts to be considered equal.
 * @param arr The first array to compare
 * @param other The second array to compare
 * @returns True if the arrays have the same elements
 * @example hasSameElements([1, 2, 3], [3, 2, 1]) //=> true
 * @example hasSameElements([1, 2, 3], [1, 2, 4]) //=> false
 * @example hasSameElements([1, 1, 2], [1, 2]) //=> false
 */
export function hasSameElements<T>(arr: readonly T[], other: readonly T[]): boolean {
  if (arr.length !== other.length) return false;
  // Under 25 elements just do the linear scan / O(n^2) version
  if (arr.length <= 25 && other.length <= 25) {
    return hasSameSmall(arr, other);
  } else {
    return hasSameLarge(arr, other);
  }
}

function hasSameSmall<T>(a: readonly T[], b: readonly T[]): boolean {
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
function hasSameLarge<T>(a: readonly T[], b: readonly T[]): boolean {
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
