import { asyncMapImpl } from "src/array/asyncMap/asyncMap.impl";
import { CallbackFn } from "src/array/utils";

export async function asyncFilterImpl<T>(this: T[], predicate: CallbackFn<T, Promise<boolean>>): Promise<T[]> {
  const results = await asyncMapImpl.call<T[], [CallbackFn<T, Promise<boolean>>], Promise<boolean[]>>(this, predicate);
  return this.filter((_v, index) => results[index]);
}

export async function asyncFilter<T>(arr: T[], predicate: CallbackFn<T, Promise<boolean>>): Promise<T[]> {
  return asyncFilterImpl.call<T[], [CallbackFn<T, Promise<boolean>>], Promise<T[]>>(arr, predicate);
}
