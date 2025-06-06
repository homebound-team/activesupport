export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    without(element: T): Array<T>;
  }

  interface ReadonlyArray<T> {
    without(element: T): Array<T>;
  }
}

Array.prototype.without = function (element) {
  return this.filter((e) => e !== element);
};
