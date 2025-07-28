export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /** Returns a copy without `elements` included. */
    withoutAll(elements: readonly T[]): Array<T>;
  }

  interface ReadonlyArray<T> {
    /** Returns a copy without `elements` included. */
    withoutAll(elements: T[]): Array<T>;
  }
}

Array.prototype.withoutAll = function <T>(this: T[], elements: T[]): Array<T> {
  const result = [...this];
  result.removeAll(elements);
  return result;
};
