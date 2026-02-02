/**
 * Converts an array of [key, value] tuples into an object.
 * Equivalent to `Object.fromEntries(arr)`.
 * @param arr The array of key-value tuples to convert
 * @returns An object constructed from the key-value pairs
 * @example toObject([["a", 5], ["b", 6], ["c", 7]]) //=> {a: 5, b: 6, c: 7}
 * @example toObject([]) //=> {}
 */
export function toObject<K extends PropertyKey, V extends any>(arr: readonly (readonly [K, V])[]): Record<K, V> {
  return Object.fromEntries(arr) as any;
}
