export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Converts an array of [key, value] tuples into an object.
     * Equivalent to `Object.fromEntries(array)`.
     * @returns An object constructed from the key-value pairs
     * @example [["a", 5], ["b", 6], ["c", 7]].toObject() //=> {a: 5, b: 6, c: 7}
     * @example [].toObject() //=> {}
     */
    toObject<K extends PropertyKey, V extends any>(this: [K, V][]): Record<K, V>;
    /**
     * Converts an array of readonly [key, value] tuples into an object.
     * Equivalent to `Object.fromEntries(array)`.
     * @returns An object constructed from the key-value pairs
     * @example [["a", 5], ["b", 6], ["c", 7]].toObject() //=> {a: 5, b: 6, c: 7}
     * @example [].toObject() //=> {}
     */
    toObject<K extends PropertyKey, V extends any>(this: (readonly [K, V])[]): Record<K, V>;
  }

  interface ReadonlyArray<T> {
    /**
     * Converts an array of [key, value] tuples into an object.
     * Equivalent to `Object.fromEntries(array)`.
     * @returns An object constructed from the key-value pairs
     * @example [["a", 5], ["b", 6], ["c", 7]].toObject() //=> {a: 5, b: 6, c: 7}
     * @example [].toObject() //=> {}
     */
    toObject<K extends PropertyKey, V extends any>(this: readonly [K, V][]): Record<K, V>;
    /**
     * Converts an array of readonly [key, value] tuples into an object.
     * Equivalent to `Object.fromEntries(array)`.
     * @returns An object constructed from the key-value pairs
     * @example [["a", 5], ["b", 6], ["c", 7]].toObject() //=> {a: 5, b: 6, c: 7}
     * @example [].toObject() //=> {}
     */
    toObject<K extends PropertyKey, V extends any>(this: readonly (readonly [K, V])[]): Record<K, V>;
  }
}

Array.prototype.toObject = function <K extends PropertyKey, V extends any>(this: [K, V][]): Record<K, V> {
  return Object.fromEntries(this) as any;
};
