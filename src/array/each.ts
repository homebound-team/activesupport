export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Chainable substitution for `forEach`. Only use if actually beneficial.
     * Be careful with side effects if you actually use this in the middle
     * of a chain.
     */
    each(f: (el: T, index: number, array: T[]) => any): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Chainable substitution for `forEach`. Only use if actually necessary.
     * Be careful with side effects if you actually use this in the middle
     * of a chain.
     */
    each(f: (el: T, index: number, array: readonly T[]) => any): T[];
  }
}

Array.prototype.each = function <T>(this: T[], f: (el: T, index: number, array: T[]) => boolean): T[] {
  this.forEach(f);
  return this;
};
