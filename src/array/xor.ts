export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Returns the symmetric difference: elements that exist in either array but not in both.
     * @param other The array to compute XOR with
     * @returns Array containing elements present in either array but not in both
     * @example [1, 2, 3].xor([2, 3, 4]) //=> [1, 4]
     * @example [1, 2].xor([3, 4]) //=> [1, 2, 3, 4]
     * @example [].xor([1, 2]) //=> [1, 2]
     */
    xor(other: readonly T[]): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the symmetric difference: elements that exist in either array but not in both.
     * @param other The array to compute XOR with
     * @returns Array containing elements present in either array but not in both
     * @example [1, 2, 3].xor([2, 3, 4]) //=> [1, 4]
     * @example [1, 2].xor([3, 4]) //=> [1, 2, 3, 4]
     * @example [].xor([1, 2]) //=> [1, 2]
     */
    xor(other: readonly T[]): readonly T[];
  }
}

Array.prototype.xor = function <T>(this: T[], other: readonly T[]): T[] {
  const a = new Set(this);
  const b = new Set(other);
  return [...a.difference(b), ...b.difference(a)];
};
