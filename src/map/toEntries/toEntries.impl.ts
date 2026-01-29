export function toEntriesImpl<K, V>(this: Map<K, V>): [K, V][] {
  return this.entries().toArray();
}

export function toEntries<K, V>(map: Map<K, V>): [K, V][] {
  return toEntriesImpl.call<Map<K, V>, [], [K, V][]>(map);
}
