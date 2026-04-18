import { toObject } from "./toObject.impl";

declare global {
  interface Array<T> {
    /**
     * Converts an array of [key, value] tuples into an object.
     * Equivalent to `Object.fromEntries(arr)`.
     * @returns An object constructed from the key-value pairs
     * @example [["a", 5], ["b", 6], ["c", 7]].toObject() //=> {a: 5, b: 6, c: 7}
     * @example [].toObject() //=> {}
     */
    toObject<K extends PropertyKey, V extends any>(this: (readonly [K, V])[]): Record<K, V>;
  }

  interface ReadonlyArray<T> {
    /**
     * Converts an array of [key, value] tuples into an object.
     * Equivalent to `Object.fromEntries(arr)`.
     * @returns An object constructed from the key-value pairs
     * @example [["a", 5], ["b", 6], ["c", 7]].toObject() //=> {a: 5, b: 6, c: 7}
     * @example [].toObject() //=> {}
     */
    toObject<K extends PropertyKey, V extends any>(this: readonly (readonly [K, V])[]): Record<K, V>;
  }
}

Array.prototype.toObject = function <K extends PropertyKey, V extends any>(this: (readonly [K, V])[]): Record<K, V> {
  return toObject(this);
};
