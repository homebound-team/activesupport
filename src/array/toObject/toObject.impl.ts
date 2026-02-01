export function toObject<K extends PropertyKey, V extends any>(arr: readonly (readonly [K, V])[]): Record<K, V> {
  return Object.fromEntries(arr) as any;
}
