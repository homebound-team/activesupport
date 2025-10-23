export {}; // needed for TS to realize this file can be imported

declare global {
  interface Map<K, V> {
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
    getOrCreate(key: K, create: () => V): V;
  }
}

Map.prototype.getOrCreate = function <K, V>(this: Map<K, V>, key: K, create: () => V): V {
  const result = this.get(key) ?? create();
  this.has(key) || this.set(key, result);
  return result;
};
