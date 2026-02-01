export function toEntries<K, V>(map: Map<K, V>): [K, V][] {
  return map.entries().toArray();
}
