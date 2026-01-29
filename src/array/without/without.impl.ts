export function withoutImpl<T>(this: T[], ...elements: T[]): Array<T> {
  const result = [...this];
  result.removeAll(elements);
  return result;
}

export function without<T>(arr: T[], ...elements: T[]): Array<T> {
  return withoutImpl.call<T[], T[], Array<T>>(arr, ...elements);
}
