import { uniqueByKey } from "src/array/uniqueByKey/uniqueByKey.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array with duplicates removed based on a specific object key.
     * @param key The key to use for uniqueness comparison
     * @returns A new array containing elements with unique key values
     * @example [{id: 1, name: "a"}, {id: 1, name: "b"}].uniqueByKey("id") //=> [{id: 1, name: "a"}]
     */
    uniqueByKey(key: keyof T): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array with duplicates removed based on a specific object key.
     * @param key The key to use for uniqueness comparison
     * @returns A new array containing elements with unique key values
     * @example [{id: 1, name: "a"}, {id: 1, name: "b"}].uniqueByKey("id") //=> [{id: 1, name: "a"}]
     */
    uniqueByKey(key: keyof T): T[];
  }
}

Array.prototype.uniqueByKey = function <T>(this: T[], key: keyof T) {
  return uniqueByKey(this, key);
};
