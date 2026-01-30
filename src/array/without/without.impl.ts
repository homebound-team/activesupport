import { removeAll } from "src/array/array.impl";

export function withoutImpl<T>(this: T[], ...elements: T[]): T[] {
  const result = [...this];
  removeAll(result, elements);
  return result;
}

export function without<T>(arr: T[], ...elements: T[]): T[] {
  return withoutImpl.call<T[], T[], T[]>(arr, ...elements);
}
