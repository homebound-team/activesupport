import { sortBy } from "src/array/sortBy/sortBy.impl";
import { Comparable } from "src/utils";

declare global {
  interface Array<T> {
    /**
     * Returns a new array sorted in ascending order based on the value returned by the callback.
     * Supports sorting by multiple criteria by returning an array of values.
     * @param fn A function that returns a comparable value (or array of values) for each element
     * @returns A new sorted array
     * @example [{name: "Bob", age: 30}, {name: "Alice", age: 25}].sortBy(p => p.age) //=> [{name: "Alice", age: 25}, {name: "Bob", age: 30}]
     * @example [{a: 1, b: 2}, {a: 1, b: 1}].sortBy(o => [o.a, o.b]) //=> [{a: 1, b: 1}, {a: 1, b: 2}]
     * @example [].sortBy(x => x) //=> []
     */
    sortBy<K extends Comparable>(fn: (el: T) => K | K[]): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array sorted in ascending order based on the value returned by the callback.
     * Supports sorting by multiple criteria by returning an array of values.
     * @param fn A function that returns a comparable value (or array of values) for each element
     * @returns A new sorted array
     * @example [{name: "Bob", age: 30}, {name: "Alice", age: 25}].sortBy(p => p.age) //=> [{name: "Alice", age: 25}, {name: "Bob", age: 30}]
     * @example [{a: 1, b: 2}, {a: 1, b: 1}].sortBy(o => [o.a, o.b]) //=> [{a: 1, b: 1}, {a: 1, b: 2}]
     * @example [].sortBy(x => x) //=> []
     */
    sortBy<K extends Comparable>(fn: (el: T) => K | K[]): T[];
  }
}

Array.prototype.sortBy = function <T, K extends Comparable>(this: T[], fn: (el: T) => K | K[]) {
  return sortBy(this, fn);
};
