/**
 * Converts an array of [key, value] tuples into an object.
 * Equivalent to `Object.fromEntries(array)`.
 * @returns An object constructed from the key-value pairs
 * @example [["a", 5], ["b", 6], ["c", 7]].toObject() //=> {a: 5, b: 6, c: 7}
 * @example [].toObject() //=> {}
 */
export function toObject<K extends PropertyKey, V extends any>(arr: readonly (readonly [K, V])[]): Record<K, V> {
  return Object.fromEntries(arr) as any;
}
