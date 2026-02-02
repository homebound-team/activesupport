import { sortBy } from "src/array/sortBy/sortBy.impl";
import { Comparable, KeysOfType } from "src/utils";

/**
 * Returns a new array sorted in ascending order by a specific object key.
 * @param key The key to sort by
 * @returns A new sorted array
 * @example [{name: "Bob"}, {name: "Alice"}].sortByKey("name") //=> [{name: "Alice"}, {name: "Bob"}]
 */
export function sortByKey<T, K extends KeysOfType<T, Comparable>>(arr: readonly T[], key: K): T[] {
  return sortBy(arr, (el) => el[key] as any as Comparable);
}
