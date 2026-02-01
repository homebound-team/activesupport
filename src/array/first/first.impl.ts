export function first<T>(arr: readonly T[]): T | undefined {
  return arr.length === 0 ? undefined : arr[0];
}
