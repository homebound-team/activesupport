import { asyncMap } from "src/array/asyncMap/asyncMap.impl";
import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export async function asyncFilter<T>(arr: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<T[]>;
export async function asyncFilter<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<boolean>>): Promise<T[]>;
export async function asyncFilter<T>(arr: readonly T[], fn: CallbackFnEither<T, Promise<boolean>>): Promise<T[]> {
  const results = await asyncMap(arr, fn as CallbackFnRO<T, Promise<boolean>>);
  return arr.filter((_v, index) => results[index]);
}
