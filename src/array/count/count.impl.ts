import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

export function count<T>(arr: T[], fn: CallbackFn<T, boolean>): number;
export function count<T>(arr: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<number>;
export function count<T>(arr: readonly T[], fn: CallbackFnRO<T, boolean>): number;
export function count<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<boolean>>): Promise<number>;
export function count<T>(arr: readonly T[], fn: CallbackFnEither<T, MaybePromise<boolean>>): MaybePromise<number> {
  const maybePromises = arr.map(fn as any) as MaybePromise<boolean>[];
  return maybePromiseAllThen(maybePromises, (result) => result.filter((r) => r).length);
}
