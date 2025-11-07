export {}; // needed for TS to realize this file can be imported

declare global {
  interface Map<K, V> {
    /**
     * Returns a new Map with the same keys but with values transformed by the provided function.
     * The mapping function receives both the value and key for each entry.
     * @param fn A function that transforms each value, receiving the value and key as parameters
     * @returns A new Map with transformed values
     * @example new Map([["foo", 1], ["bar", 2]]).mapValues((v) => v * 2) //=> Map { "foo" => 2, "bar" => 4 }
     * @example new Map([["foo", "a"], ["bar", "b"]]).mapValues((v, k) => `${k}:${v}`) //=> Map { "foo" => "foo:a", "bar" => "bar:b" }
     * @example new Map().mapValues((v) => v) //=> Map {}
     */
    mapValues<R>(fn: (value: V, key: K) => R): Map<K, R>;
  }
}

Map.prototype.mapValues = function <K, V, R>(this: Map<K, V>, fn: (value: V, key: K) => R): Map<K, R> {
  const result = new Map<K, R>();
  for (const [key, value] of this.entries()) {
    result.set(key, fn(value, key));
  }
  return result;
};
