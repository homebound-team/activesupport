export function differenceImpl<T>(this: T[], other: T[]): T[] {
  return [...new Set(this).difference(new Set(other))];
}

export function difference<T>(arr: T[], other: T[]): T[] {
  return differenceImpl.call<T[], [T[]], T[]>(arr, other);
}
