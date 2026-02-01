export function intersection<T>(arr: readonly T[], other: readonly T[]): T[] {
  return [...new Set(arr).intersection(new Set(other))];
}
