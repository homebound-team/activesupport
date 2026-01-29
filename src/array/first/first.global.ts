export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Returns the first element of the array, or `undefined` if the array is empty.
     * @example ["a", "b", "c"].first //=> "a"
     * @example [].first //=> undefined
     */
    first: T | undefined;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the first element of the array, or `undefined` if the array is empty.
     * @example ["a", "b", "c"].first //=> "a"
     * @example [].first //=> undefined
     */
    first: T | undefined;
  }
}

Object.defineProperty(Array.prototype, "first", {
  enumerable: false,
  get: function () {
    return this.isEmpty ? undefined : this[0];
  },
});
