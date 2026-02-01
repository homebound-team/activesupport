import { hasSameElements } from "src/array/hasSameElements/hasSameElements.impl";

export function notSameElements<T>(arr: readonly T[], other: readonly T[]): boolean {
  return !hasSameElements(arr, other);
}
