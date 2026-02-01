import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export function findFirst<T, U>(arr: T[], fn: CallbackFn<T, U | undefined>): U | undefined;
export function findFirst<T, U>(arr: readonly T[], fn: CallbackFnRO<T, U | undefined>): U | undefined;
export function findFirst<T, U>(arr: readonly T[], fn: CallbackFnEither<T, U | undefined>): U | undefined {
  for (let i = 0; i < arr.length; i++) {
    const result = fn(arr[i], i, arr as T[]);
    if (result !== undefined) return result;
  }
  return undefined;
}
