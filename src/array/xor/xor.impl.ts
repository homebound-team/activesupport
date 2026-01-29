export function xorImpl<T>(this: T[], other: readonly T[]): T[] {
  const a = new Set(this);
  const b = new Set(other);
  return [...a.difference(b), ...b.difference(a)];
}

export function xor<T>(arr: T[], other: readonly T[]): T[] {
  return xorImpl.call<T[], [readonly T[]], T[]>(arr, other);
}
