/**
 * Converts a Map to an array of [key, value] tuples.
 * This is a convenience function that wraps the Map's entries() iterator into an array.
 * @param map The Map to convert
 * @returns An array of [key, value] pairs from the Map
 * @example toEntries(new Map([["foo", "a"], ["bar", 5]])) //=> [["foo", "a"], ["bar", 5]]
 * @example toEntries(new Map()) //=> []
 * @example toEntries(new Map([[{}, "obj"], [42, "num"]])) //=> [[{}, "obj"], [42, "num"]]
 */
export function toEntries<K, V>(map: Map<K, V>): [K, V][] {
  return map.entries().toArray();
}
