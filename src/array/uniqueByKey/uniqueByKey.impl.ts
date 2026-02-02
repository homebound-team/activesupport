import { uniqueBy } from "src/array/uniqueBy/uniqueBy.impl";
import { KeysOfType } from "src/utils";

/**
 * Returns a new array with duplicates removed based on a specific object key.
 * @param arr The array to remove duplicates from
 * @param key The key to use for uniqueness comparison
 * @returns A new array containing elements with unique key values
 * @example uniqueByKey([{id: 1, name: "a"}, {id: 1, name: "b"}], "id") //=> [{id: 1, name: "a"}]
 */
export function uniqueByKey<T, K extends KeysOfType<T, any>>(arr: readonly T[], key: K): T[] {
  return uniqueBy(arr, (el) => el[key]);
}
