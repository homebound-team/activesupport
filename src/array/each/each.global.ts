export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Executes a function for each element and returns the original array for chaining.
     * Use this instead of `forEach` when you need to continue a method chain.
     * @param f A function to execute for each element
     * @returns The original array
     * @example [1, 2, 3].each(n => console.log(n)).map(n => n * 2) //=> [2, 4, 6]
     * @example [].each(n => console.log(n)) //=> []
     */
    each(f: (el: T, index: number, array: T[]) => any): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Executes a function for each element and returns the original array for chaining.
     * Use this instead of `forEach` when you need to continue a method chain.
     * @param f A function to execute for each element
     * @returns The original array
     * @example [1, 2, 3].each(n => console.log(n)).map(n => n * 2) //=> [2, 4, 6]
     * @example [].each(n => console.log(n)) //=> []
     */
    each(f: (el: T, index: number, array: readonly T[]) => any): T[];
  }
}

Array.prototype.each = function <T>(this: T[], f: (el: T, index: number, array: T[]) => boolean): T[] {
  this.forEach(f);
  return this;
};
