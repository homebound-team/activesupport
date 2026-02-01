export function findBefore<T>(arr: readonly T[], el: T): T | undefined {
  const index = arr.indexOf(el);
  return index < 1 ? undefined : arr[index - 1];
}
