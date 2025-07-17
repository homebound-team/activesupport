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
    remove(elements: readonly T[]): void;
    /**
     * Removes `elements` by mutating the array.
     *
     * See `without` for a non-mutating version.
     */
    remove(...elements: readonly T[]): void;
  }
}

Array.prototype.remove = function <T>(this: T[], arg: T | T[]) {
  // eslint-disable-next-line prefer-rest-params
  const elements = Array.isArray(arg) ? arg : Array.from(arguments);
  for (let index = this.length - 1; index >= 0; index--) {
    if (elements.includes(this[index])) {
      this.splice(index, 1);
    }
  }
};
