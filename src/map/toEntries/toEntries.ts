export {}; // needed for TS to realize this file can be imported

declare global {
  interface Map<K, V> {
    /**
     * Converts the Map to an array of [key, value] tuples.
     * This is a convenience method that wraps the Map's entries() iterator into an array.
     * @returns An array of [key, value] pairs from the Map
     * @example new Map([["foo", "a"], ["bar", 5]]).toEntries() //=> [["foo", "a"], ["bar", 5]]
     * @example new Map().toEntries() //=> []
     * @example new Map([[{}, "obj"], [42, "num"]]).toEntries() //=> [[{}, "obj"], [42, "num"]]
     */
    toEntries(): [K, V][];
  }
}

Map.prototype.toEntries = function <K, V>(this: Map<K, V>): [K, V][] {
  return [...this.entries()];
};
