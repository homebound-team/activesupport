export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Iterates through the array and returns the first defined result from the callback function.
     * Stops iteration as soon as a defined value is found.
     * @param fn A function that returns a value or undefined for each element
     * @returns The first defined result from the callback, or undefined if none found
     * @example ["", "hello", "world"].findFirst(s => s || undefined) //=> "hello"
     * @example ["not a number", "42", "100"].findFirst(s => { const n = parseInt(s); return isNaN(n) ? undefined : n }) //=> 42
     * @example [].findFirst(s => s) //=> undefined
     */
    findFirst<U>(fn: (element: T) => U | undefined): U | undefined;
  }

  interface ReadonlyArray<T> {
    /**
     * Iterates through the array and returns the first defined result from the callback function.
     * Stops iteration as soon as a defined value is found.
     * @param fn A function that returns a value or undefined for each element
     * @returns The first defined result from the callback, or undefined if none found
     * @example ["", "hello", "world"].findFirst(s => s || undefined) //=> "hello"
     * @example ["not a number", "42", "100"].findFirst(s => { const n = parseInt(s); return isNaN(n) ? undefined : n }) //=> 42
     * @example [].findFirst(s => s) //=> undefined
     */
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
