export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /** Returns a copy without `element` included. */
    without(element: T): Array<T>;
    /** Returns a copy without `elements` included. */
    without(...elements: readonly T[]): Array<T>;
  }

  interface ReadonlyArray<T> {
    /** Returns a copy without `element` included. */
    without(element: T): Array<T>;
    /** Returns a copy without `elements` included. */
    without(...elements: readonly T[]): Array<T>;
  }
}

Array.prototype.without = function <T>(this: T[], ...elements: T[]): Array<T> {
  const result = [...this];
  result.removeAll(elements);
  return result;
};
