import { removeAllImpl } from "src/array/removeAll/removeAll.impl";

export function withoutAllImpl<T>(this: T[], elements: T[]): Array<T> {
  const result = [...this];
  removeAllImpl.call(result, elements);
  return result;
}

export function withoutAll<T>(arr: T[], elements: T[]): Array<T> {
  return withoutAllImpl.call<T[], [T[]], Array<T>>(arr, elements);
}
