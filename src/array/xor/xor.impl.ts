export function xor<T>(arr: readonly T[], other: readonly T[]): T[] {
  const a = new Set(arr);
  const b = new Set(other);
  return [...a.difference(b), ...b.difference(a)];
}
