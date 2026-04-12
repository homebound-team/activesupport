export {}; // needed for TS to realize this file can be imported

type OnlyOneElementArray<T> = [T] & { first: T };
type OnlyOneElementReadonlyArray<T> = readonly [T] & { first: T };

// Intentionally a method instead of a getter because TypeScript does not support
// type predicates on accessors.

declare global {
  interface Array<T> {
    /**
     * Returns true if the array contains exactly one element.
     * Narrows away the empty-array `undefined` from `first` when true.
     * @example ["a"].hasOnlyOneElement() //=> true
     * @example ["a", "b"].hasOnlyOneElement() //=> false
     * @example [].hasOnlyOneElement() //=> false
     */
    hasOnlyOneElement(): this is OnlyOneElementArray<T>;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if the array contains exactly one element.
     * Narrows away the empty-array `undefined` from `first` when true.
     * @example ["a"].hasOnlyOneElement() //=> true
     * @example ["a", "b"].hasOnlyOneElement() //=> false
     * @example [].hasOnlyOneElement() //=> false
     */
    hasOnlyOneElement(): this is OnlyOneElementReadonlyArray<T>;
  }
}

Array.prototype.hasOnlyOneElement = function <T>(this: T[]): this is OnlyOneElementArray<T> {
  return this.length === 1;
};
