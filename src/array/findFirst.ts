export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    findFirst<U>(fn: (element: T) => U | undefined): U | undefined;
  }

  interface ReadonlyArray<T> {
    findFirst<U>(fn: (element: T) => U | undefined): U | undefined;
  }
}

Array.prototype.findFirst = function <T, U>(this: T[], fn: (element: T) => U | undefined): U | undefined {
  for (const element of this) {
    const result = fn(element);
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
};
