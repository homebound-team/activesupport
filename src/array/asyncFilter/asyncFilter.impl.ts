import { asyncMap } from "src/array/asyncMap/asyncMap.impl";
import { CallbackFn } from "src/array/utils";

export async function asyncFilter<T>(arr: T[], predicate: CallbackFn<T, Promise<boolean>>): Promise<T[]> {
  const results = await asyncMap(arr, predicate);
  return arr.filter((_v, index) => results[index]);
}
