import { uniqueByImpl } from "src/array/uniqueBy/uniqueBy.impl";
import { CallbackFn } from "src/array/utils";
import { KeysOfType } from "src/utils";

export function uniqueByKeyImpl<T, K extends KeysOfType<T, any>>(this: T[], key: K): T[] {
  return uniqueByImpl.call<T[], [CallbackFn<T, T[K]>], T[]>(this, (el) => el[key]);
}

export function uniqueByKey<T, K extends KeysOfType<T, any>>(arr: T[], key: K): T[] {
  return uniqueByKeyImpl.call<T[], [K], T[]>(arr, key);
}
