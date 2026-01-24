import { Comparable, compare, KeysOfType } from "../utils";

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
    /**
     * Returns a new array sorted in ascending order by a specific object key.
     * @param key The key to sort by
     * @returns A new sorted array
     * @example [{name: "Bob"}, {name: "Alice"}].sortByKey("name") //=> [{name: "Alice"}, {name: "Bob"}]
     */
    sortByKey<K extends KeysOfType<T, Comparable>>(key: K): T[];
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
    /**
     * Returns a new array sorted in ascending order by a specific object key.
     * @param key The key to sort by
     * @returns A new sorted array
     * @example [{name: "Bob"}, {name: "Alice"}].sortByKey("name") //=> [{name: "Alice"}, {name: "Bob"}]
     */
    sortByKey<K extends KeysOfType<T, Comparable>>(key: K): T[];
  }
}

Array.prototype.sortBy = function <T, K extends Comparable>(this: T[], fn: (el: T) => K | K[]): T[] {
  return [...this].sort((a, b) => {
    const av = fn(a);
    const bv = fn(b);
    if (Array.isArray(av) && Array.isArray(bv)) {
      if (av.length !== bv.length) {
        throw new Error("sortBy cannot compare arrays of different lengths");
      }
      for (let i = 0; i < av.length; i++) {
        const comparison = compare(av[i], bv[i]);
        if (comparison !== 0) return comparison;
      }
      return 0;
    } else if (Array.isArray(av) || Array.isArray(bv)) {
      throw new Error("Cannot compare array to non-array");
    } else {
      return compare(av, bv);
    }
  });
};

Array.prototype.sortByKey = function <T, K extends KeysOfType<T, Comparable>>(this: T[], key: K): T[] {
  return this.sortBy((el) => el[key] as any as Comparable);
};
