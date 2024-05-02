export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    isEmpty: boolean;
  }

  interface ReadonlyArray<T> {
    isEmpty: boolean;
  }
}

Object.defineProperty(Array.prototype, "isEmpty", {
  enumerable: false,
  get: function () {
    return this.length === 0;
  },
});
