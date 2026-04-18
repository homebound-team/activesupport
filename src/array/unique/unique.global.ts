import { unique } from "./unique.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array with duplicate elements removed.
     * @returns A new array containing only unique elements
     * @example [1, 2, 2, 3, 3, 3].unique() //=> [1, 2, 3]
     * @example [].unique() //=> []
     */
    unique(): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array with duplicate elements removed.
     * @returns A new array containing only unique elements
     * @example [1, 2, 2, 3, 3, 3].unique() //=> [1, 2, 3]
     * @example [].unique() //=> []
     */
    unique(): T[];
  }
}

Array.prototype.unique = function <T>(this: T[]): T[] {
  return unique(this);
};
