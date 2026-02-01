import { removeAll } from "src/array/removeAll/removeAll.impl";

export function withoutAll<T>(arr: readonly T[], elements: readonly T[]): Array<T> {
  const result = [...arr];
  removeAll(result, elements);
  return result;
}
