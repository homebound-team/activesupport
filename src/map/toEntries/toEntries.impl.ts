/**
 * Converts the Map to an array of [key, value] tuples.
 * This is a convenience method that wraps the Map's entries() iterator into an array.
 * @returns An array of [key, value] pairs from the Map
 * @example new Map([["foo", "a"], ["bar", 5]]).toEntries() //=> [["foo", "a"], ["bar", 5]]
 * @example new Map().toEntries() //=> []
 * @example new Map([[{}, "obj"], [42, "num"]]).toEntries() //=> [[{}, "obj"], [42, "num"]]
 */
export function toEntries<K, V>(map: Map<K, V>): [K, V][] {
  return map.entries().toArray();
}
