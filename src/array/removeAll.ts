export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Removes `elements` by mutating the array.
     *
     * See `withoutAll` for a non-mutating version.
     */
    removeAll(elements: readonly T[]): void;
  }
}

Array.prototype.removeAll = function <T>(this: T[], elements: readonly T[]) {
  if (elements.length === 0) return;
  // start from the end of the array so we don't need to worry about re-ordering
  for (let index = this.length - 1; index >= 0; index--) {
    if (elements.includes(this[index])) {
      this.splice(index, 1);
    }
  }
};
