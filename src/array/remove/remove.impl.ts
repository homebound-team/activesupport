import { removeAllImpl } from "src/array/removeAll/removeAll.impl";

export function removeImpl<T>(this: T[], ...elements: readonly T[]) {
  removeAllImpl.call(this, elements);
}

export function remove<T>(arr: T[], ...elements: readonly T[]) {
  return removeImpl.call<T[], T[], void>(arr, ...elements);
}
