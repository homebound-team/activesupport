import { removeAllImpl } from "src/array/removeAll/removeAll.impl";

export function withoutImpl<T>(this: T[], ...elements: T[]): Array<T> {
  const result = [...this];
  removeAllImpl.call(result, elements);
  return result;
}

export function without<T>(arr: T[], ...elements: T[]): Array<T> {
  return withoutImpl.call<T[], T[], Array<T>>(arr, ...elements);
}
