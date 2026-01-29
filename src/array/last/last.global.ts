export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Returns the last element of the array, or `undefined` if the array is empty.
     * @example ["a", "b", "c"].last //=> "c"
     * @example [].last //=> undefined
     */
    last: T | undefined;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the last element of the array, or `undefined` if the array is empty.
     * @example ["a", "b", "c"].last //=> "c"
     * @example [].last //=> undefined
     */
    last: T | undefined;
  }
}

Object.defineProperty(Array.prototype, "last", {
  enumerable: false,
  get: function () {
    return this.isEmpty ? undefined : this[this.length - 1];
  },
});
