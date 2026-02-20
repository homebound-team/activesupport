import { Comparable } from "src/utils";
import { sortBy } from "./sortBy.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array sorted in ascending order based on the value returned by the callback.
     * Supports sorting by multiple criteria by returning the array of values.
     * @param fn A function that returns a comparable value (or array of values) for each element
     * @returns A new sorted array
     * @example [{name: "Bob", age: 30}, {name: "Alice", age: 25}].sortBy(p => p.age) //=> [{name: "Alice", age: 25}, {name: "Bob", age: 30}]
     * @example [{a: 1, b: 2}, {a: 1, b: 1}].sortBy(o => [o.a, o.b]) //=> [{a: 1, b: 1}, {a: 1, b: 2}]
     * @example [].sortBy(x => x) //=> []
     */
    sortBy<U extends Comparable>(fn: (el: T) => U | U[]): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array sorted in ascending order based on the value returned by the callback.
     * Supports sorting by multiple criteria by returning the array of values.
     * @param fn A function that returns a comparable value (or array of values) for each element
     * @returns A new sorted array
     * @example [{name: "Bob", age: 30}, {name: "Alice", age: 25}].sortBy(p => p.age) //=> [{name: "Alice", age: 25}, {name: "Bob", age: 30}]
     * @example [{a: 1, b: 2}, {a: 1, b: 1}].sortBy(o => [o.a, o.b]) //=> [{a: 1, b: 1}, {a: 1, b: 2}]
     * @example [].sortBy(x => x) //=> []
     */
    sortBy<U extends Comparable>(fn: (el: T) => U | U[]): T[];
  }
}

Array.prototype.sortBy = function <T, U extends Comparable>(this: T[], fn: (el: T) => U | U[]): T[] {
  return sortBy(this, fn);
};
