import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export function each<T>(arr: T[], fn: CallbackFn<T>): T[];
export function each<T>(arr: readonly T[], fn: CallbackFnRO<T>): readonly T[];
export function each<T>(arr: readonly T[], fn: CallbackFnEither<T>): readonly T[] {
  arr.forEach(fn as CallbackFnRO<T>);
  return arr;
}
