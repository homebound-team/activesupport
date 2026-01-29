export function toObjectImpl<K extends PropertyKey, V extends any>(this: [K, V][]): Record<K, V> {
  return Object.fromEntries(this) as any;
}

export function toObject<K extends PropertyKey, V extends any>(arr: [K, V][]): Record<K, V> {
  return toObjectImpl.call<[K, V][], [], Record<K, V>>(arr);
}
