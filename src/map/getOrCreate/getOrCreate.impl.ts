/**
 * Returns the value for a key if it exists, otherwise creates and stores a new value using the provided function.
 * The create function is only called if the key doesn't exist, making this ideal for lazy initialization.
 * @param key The key to look up or create
 * @param create A function that returns the value to create and store if the key doesn't exist
 * @returns The existing or newly created value
 * @example new Map([["foo", "bar"]]).getOrCreate("foo", () => "baz") //=> "bar"
 * @example new Map().getOrCreate("foo", () => "baz") //=> "baz"
 * @example const m = new Map(); m.getOrCreate("x", () => 1); m.has("x") //=> true
 */
export function getOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V): V {
  const result = map.get(key) ?? create();
  map.has(key) || map.set(key, result);
  return result;
}
