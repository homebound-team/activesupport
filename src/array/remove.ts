export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Removes `element` by mutating the array.
     *
     * See `without` for a non-mutating version.
     */
    remove(element: T): void;
    /**
     * Removes `elements` by mutating the array.
     *
     * See `without` for a non-mutating version.
     */
    remove(...elements: readonly T[]): void;
  }
}

Array.prototype.remove = function <T>(this: T[], ...elements: readonly T[]) {
  this.removeAll(elements);
};
