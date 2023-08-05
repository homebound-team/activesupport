export {}; // needed for TS to realize this file can be imported

declare global {
  interface Map<K, V> {
    getOrCreate(key: K, create: () => V): V;
  }
}

Map.prototype.getOrCreate = function <K, V>(this: Map<K, V>, key: K, create: () => V): V {
  const result = this.get(key) ?? create();
  this.has(key) || this.set(key, result);
  return result;
};
