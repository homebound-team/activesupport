export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    without(element: T): Array<T>;
    without(...elements: readonly T[]): Array<T>;
  }

  interface ReadonlyArray<T> {
    without(element: T): Array<T>;
    without(...elements: readonly T[]): Array<T>;
  }
}

Array.prototype.without = function <T>(this: T[], ...elements: T[]): Array<T> {
  const result = [...this];
  result.remove(...elements);
  return result;
};
