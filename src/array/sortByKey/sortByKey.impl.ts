import { sortBy } from "src/array/sortBy/sortBy.impl";
import { Comparable, KeysOfType } from "src/utils";

export function sortByKey<T, K extends KeysOfType<T, Comparable>>(arr: readonly T[], key: K): T[] {
  return sortBy(arr, (el) => el[key] as any as Comparable);
}
