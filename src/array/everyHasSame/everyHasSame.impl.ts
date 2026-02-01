import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export function everyHasSame<T>(arr: T[], fn: CallbackFn<T, unknown>): boolean;
export function everyHasSame<T>(arr: readonly T[], fn: CallbackFnRO<T, unknown>): boolean;
export function everyHasSame<T>(arr: readonly T[], fn: CallbackFnEither<T, unknown>): boolean {
  if (arr.length === 0) return true;
  const first = fn(arr[0], 0, arr as T[]);
  for (let i = 1; i < arr.length; i++) {
    if (fn(arr[i], i, arr as T[]) !== first) return false;
  }
  return true;
}
