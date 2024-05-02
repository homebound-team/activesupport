export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    first: T | undefined;
  }

  interface ReadonlyArray<T> {
    first: T | undefined;
  }
}

Object.defineProperty(Array.prototype, "first", {
  enumerable: false,
  get: function () {
    return this.isEmpty ? undefined : this[0];
  },
});
