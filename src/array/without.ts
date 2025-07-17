export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /** Returns a copy without `element` included. */
    without(element: T): Array<T>;
    /** Returns a copy without `elements` included. */
    without(elements: readonly T[]): Array<T>;
    /** Returns a copy without `elements` included. */
    without(...elements: readonly T[]): Array<T>;
  }

  interface ReadonlyArray<T> {
    /** Returns a copy without `element` included. */
    without(element: T): Array<T>;
    /** Returns a copy without `elements` included. */
    without(elements: T): Array<T>;
    /** Returns a copy without `elements` included. */
    without(...elements: readonly T[]): Array<T>;
  }
}

Array.prototype.without = function <T>(this: T[], arg: T | T[]): Array<T> {
  // eslint-disable-next-line prefer-rest-params
  const elements = Array.isArray(arg) ? arg : Array.from(arguments);
  const result = [...this];
  result.remove(elements);
  return result;
};
