export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Returns true if the array contains no elements.
     * @example [].isEmpty //=> true
     * @example ["a"].isEmpty //=> false
     */
    isEmpty: boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if the array contains no elements.
     * @example [].isEmpty //=> true
     * @example ["a"].isEmpty //=> false
     */
    isEmpty: boolean;
  }
}

Object.defineProperty(Array.prototype, "isEmpty", {
  enumerable: false,
  get: function () {
    return this.length === 0;
  },
});
