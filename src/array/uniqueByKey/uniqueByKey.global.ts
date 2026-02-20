import { KeysOfType } from "src/utils";
import { uniqueByKey } from "./uniqueByKey.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array with duplicates removed based on a specific object key.
     * @param key The key to use for uniqueness comparison
     * @returns A new array containing elements with unique key values
     * @example [{id: 1, name: "a"}, {id: 1, name: "b"}].uniqueByKey("id") //=> [{id: 1, name: "a"}]
     */
    uniqueByKey<K extends KeysOfType<T, any>>(key: K): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array with duplicates removed based on a specific object key.
     * @param key The key to use for uniqueness comparison
     * @returns A new array containing elements with unique key values
     * @example [{id: 1, name: "a"}, {id: 1, name: "b"}].uniqueByKey("id") //=> [{id: 1, name: "a"}]
     */
    uniqueByKey<K extends KeysOfType<T, any>>(key: K): T[];
  }
}

Array.prototype.uniqueByKey = function <T, K extends KeysOfType<T, any>>(this: T[], key: K): T[] {
  return uniqueByKey(this, key);
};
