export function findAfter<T>(arr: readonly T[], el: T): T | undefined {
  const index = arr[arr.length - 1] === el ? -1 : arr.indexOf(el);
  return index === -1 ? undefined : arr[index + 1];
}
