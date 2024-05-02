export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    nonEmpty: boolean;
  }

  interface ReadonlyArray<T> {
    nonEmpty: boolean;
  }
}

Object.defineProperty(Array.prototype, "nonEmpty", {
  enumerable: false,
  get: function () {
    return this.length > 0;
  },
});
