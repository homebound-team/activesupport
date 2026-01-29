export function withoutAllImpl<T>(this: T[], elements: T[]): Array<T> {
  const result = [...this];
  result.removeAll(elements);
  return result;
}

export function withoutAll<T>(arr: T[], elements: T[]): Array<T> {
  return withoutAllImpl.call<T[], [T[]], Array<T>>(arr, elements);
}
