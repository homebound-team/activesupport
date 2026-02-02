import { Comparable, compare, fail } from "src/utils";

/**
 * Returns a new array sorted in ascending order based on the value returned by the callback.
 * Supports sorting by multiple criteria by returning an array of values.
 * @param fn A function that returns a comparable value (or array of values) for each element
 * @returns A new sorted array
 * @example [{name: "Bob", age: 30}, {name: "Alice", age: 25}].sortBy(p => p.age) //=> [{name: "Alice", age: 25}, {name: "Bob", age: 30}]
 * @example [{a: 1, b: 2}, {a: 1, b: 1}].sortBy(o => [o.a, o.b]) //=> [{a: 1, b: 1}, {a: 1, b: 2}]
 * @example [].sortBy(x => x) //=> []
 */
export function sortBy<T, U extends Comparable>(arr: readonly T[], fn: (el: T) => U | U[]): T[] {
  return arr.slice().sort((a, b) => {
    const av = fn(a);
    const bv = fn(b);
    if (Array.isArray(av) && Array.isArray(bv)) {
      if (av.length !== bv.length) fail("sortBy cannot compare arrays of different lengths");
      for (let i = 0; i < av.length; i++) {
        const comparison = compare(av[i], bv[i]);
        if (comparison !== 0) return comparison;
      }
      return 0;
    } else if (Array.isArray(av) || Array.isArray(bv)) {
      fail("sortBy cannot compare array to non-array");
    } else {
      return compare(av, bv);
    }
  });
}
