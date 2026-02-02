/**
 * Returns the symmetric difference: elements that exist in either array but not in both.
 * @param other The array to compute XOR with
 * @returns Array containing elements present in either array but not in both
 * @example [1, 2, 3].xor([2, 3, 4]) //=> [1, 4]
 * @example [1, 2].xor([3, 4]) //=> [1, 2, 3, 4]
 * @example [].xor([1, 2]) //=> [1, 2]
 */
export function xor<T>(arr: readonly T[], other: readonly T[]): T[] {
  const a = new Set(arr);
  const b = new Set(other);
  return [...a.difference(b), ...b.difference(a)];
}
