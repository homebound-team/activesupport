import { withoutAll } from "src/array/array.impl";

export function without<T>(arr: readonly T[], ...elements: readonly T[]): T[] {
  return withoutAll(arr, elements);
}
