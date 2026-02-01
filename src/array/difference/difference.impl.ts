export function difference<T>(arr: readonly T[], other: T[]): T[] {
  return [...new Set(arr).difference(new Set(other))];
}
