import { removeAll } from "src/array/removeAll/removeAll.impl";

export function remove<T>(arr: T[], ...elements: readonly T[]) {
  removeAll(arr, elements);
}
