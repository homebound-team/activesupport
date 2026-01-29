export function getOrCreateImpl<K, V>(this: Map<K, V>, key: K, create: () => V): V {
  const result = this.get(key) ?? create();
  this.has(key) || this.set(key, result);
  return result;
}

export function getOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V): V {
  return getOrCreateImpl.call<Map<K, V>, [K, () => V], V>(map, key, create);
}
