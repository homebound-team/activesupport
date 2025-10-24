import { Temporal } from "temporal-polyfill";
import { Comparable, KeysOfType } from "../utils";

declare global {
  interface Array<T> {
    /**
     * Returns a new array with duplicate elements removed.
     * @returns A new array containing only unique elements
     * @example [1, 2, 2, 3, 3, 3].unique() //=> [1, 2, 3]
     * @example [].unique() //=> []
     */
    unique(): T[];
    /**
     * Returns a new array with duplicates removed based on a specific object key.
     * @param key The key to use for uniqueness comparison
     * @returns A new array containing elements with unique key values
     * @example [{id: 1, name: "a"}, {id: 1, name: "b"}].uniqueByKey("id") //=> [{id: 1, name: "a"}]
     */
    uniqueByKey(key: keyof T): T[];
    /**
     * Returns a new array with duplicates removed based on the value returned by the callback.
     * @param f A function that returns the value to use for uniqueness comparison
     * @returns A new array containing elements with unique callback values
     * @example [{id: 1}, {id: 2}, {id: 1}].uniqueBy(o => o.id) //=> [{id: 1}, {id: 2}]
     */
    uniqueBy(f: (el: T, index: number, array: T[]) => unknown): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array with duplicate elements removed.
     * @returns A new array containing only unique elements
     * @example [1, 2, 2, 3, 3, 3].unique() //=> [1, 2, 3]
     * @example [].unique() //=> []
     */
    unique(): T[];
    /**
     * Returns a new array with duplicates removed based on a specific object key.
     * @param key The key to use for uniqueness comparison
     * @returns A new array containing elements with unique key values
     * @example [{id: 1, name: "a"}, {id: 1, name: "b"}].uniqueByKey("id") //=> [{id: 1, name: "a"}]
     */
    uniqueByKey(key: keyof T): T[];
    /**
     * Returns a new array with duplicates removed based on the value returned by the callback.
     * @param f A function that returns the value to use for uniqueness comparison
     * @returns A new array containing elements with unique callback values
     * @example [{id: 1}, {id: 2}, {id: 1}].uniqueBy(o => o.id) //=> [{id: 1}, {id: 2}]
     */
    uniqueBy(f: (el: T, index: number, array: readonly T[]) => unknown): T[];
  }
}

Array.prototype.unique = function () {
  return [...new Set(this)];
};

/** Would be cool to allow an array of keys to make the criteria of "unique" more flexible */
Array.prototype.uniqueBy = function <T>(f: (el: T, index: number, array: T[]) => unknown): T[] {
  const result: T[] = [];
  const set = new Set();
  for (let i = 0; i < this.length; i++) {
    let key = f(this[i], i, this);
    if (key instanceof Date) {
      key = key.getTime();
    } else if (key instanceof Temporal.ZonedDateTime) {
      key = key.epochMilliseconds;
    } else if (key instanceof Temporal.PlainDate) {
      key = key.toString();
    } else if (typeof key === "bigint") {
      key = `${key}`;
    }
    if (!set.has(key)) {
      result.push(this[i]);
      set.add(key);
    }
  }
  return result;
};

Array.prototype.uniqueByKey = function <T>(key: KeysOfType<T, Comparable>): T[] {
  return this.uniqueBy((el) => el[key]);
};
