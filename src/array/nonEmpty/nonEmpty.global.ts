export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Returns true if the array contains at least one element.
     * @example ["a"].nonEmpty //=> true
     * @example [].nonEmpty //=> false
     */
    nonEmpty: boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if the array contains at least one element.
     * @example ["a"].nonEmpty //=> true
     * @example [].nonEmpty //=> false
     */
    nonEmpty: boolean;
  }
}

Object.defineProperty(Array.prototype, "nonEmpty", {
  enumerable: false,
  get: function () {
    return this.length > 0;
  },
});
