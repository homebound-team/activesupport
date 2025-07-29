export {}; // needed for TS to realize this file can be imported

declare global {
  interface Map<K, V> {
    toEntries(): [K, V][];
  }
}

Map.prototype.toEntries = function <K, V>(this: Map<K, V>): [K, V][] {
  return [...this.entries()];
};
