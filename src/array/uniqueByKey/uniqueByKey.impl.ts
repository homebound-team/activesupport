import { uniqueBy } from "src/array/uniqueBy/uniqueBy.impl";
import { KeysOfType } from "src/utils";

export function uniqueByKey<T, K extends KeysOfType<T, any>>(arr: readonly T[], key: K): T[] {
  return uniqueBy(arr, (el) => el[key]);
}
