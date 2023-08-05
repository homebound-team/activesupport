export {};

declare global {
  interface Map<K, V> {
    getOrCreate(key: K, create: () => V): V;
  }
}

Map.prototype.getOrCreate = function <K, V>(this: Map<K, V>, key: K, create: () => V) {
  const maybeResult = this.get(key) ?? create();
  this.set(key, maybeResult);
  return maybeResult;
};
