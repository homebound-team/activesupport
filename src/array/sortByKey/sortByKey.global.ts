import { sortByKey } from "src/array/sortByKey/sortByKey.impl";
import { Comparable, KeysOfType } from "src/utils";

declare global {
  interface Array<T> {
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
     * Returns a new array sorted in ascending order by a specific object key.
     * @param key The key to sort by
     * @returns A new sorted array
     * @example [{name: "Bob"}, {name: "Alice"}].sortByKey("name") //=> [{name: "Alice"}, {name: "Bob"}]
     */
    sortByKey<K extends KeysOfType<T, Comparable>>(key: K): T[];
  }
}

Array.prototype.sortByKey = function <T, K extends KeysOfType<T, Comparable>>(this: T[], key: K) {
  return sortByKey(this, key);
};
