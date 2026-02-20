import { without } from "./without.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array with the specified element(s) removed.
     * This does not mutate the original array. Use `remove` for a mutating version.
     * @param elements The element(s) to exclude from the new array
     * @returns A new array without the specified element(s)
     * @example [1, 2, 3, 2].without(2) //=> [1, 3]
     * @example [1, 2, 3].without(1, 3) //=> [2]
     * @example [].without(1) //=> []
     */
    without(...elements: readonly T[]): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array with the specified element(s) removed.
     * This does not mutate the original array. Use `remove` for a mutating version.
     * @param elements The element(s) to exclude from the new array
     * @returns A new array without the specified element(s)
     * @example [1, 2, 3, 2].without(2) //=> [1, 3]
     * @example [1, 2, 3].without(1, 3) //=> [2]
     * @example [].without(1) //=> []
     */
    without(...elements: readonly T[]): T[];
  }
}

Array.prototype.without = function <T>(this: T[], ...elements: readonly T[]): T[] {
  return without(this, ...elements);
};
