export function getOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V): V {
  const result = map.get(key) ?? create();
  map.has(key) || map.set(key, result);
  return result;
}
