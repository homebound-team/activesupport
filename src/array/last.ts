export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    last: T | undefined;
  }

  interface ReadonlyArray<T> {
    last: T | undefined;
  }
}

Object.defineProperty(Array.prototype, "last", {
  enumerable: false,
  get: function () {
    return this.isEmpty ? undefined : this[this.length - 1];
  },
});
