import { sortByImpl } from "src/array/sortBy/sortBy.impl";
import { Comparable, KeysOfType } from "src/utils";

export function sortByKeyImpl<T, K extends KeysOfType<T, Comparable>>(this: T[], key: K): T[] {
  return sortByImpl.call<T[], [(el: T) => Comparable], T[]>(this, (el) => el[key] as any as Comparable);
}

export function sortByKey<T, K extends KeysOfType<T, Comparable>>(arr: T[], key: K): T[] {
  return sortByKeyImpl.call<T[], [K], T[]>(arr, key);
}
