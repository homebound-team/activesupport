import { CallbackFn } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

export function countImpl<T>(this: T[], fn: CallbackFn<T, MaybePromise<boolean>>): MaybePromise<number> {
  const maybePromises = this.map(fn as any) as MaybePromise<boolean>[];
  return maybePromiseAllThen(maybePromises, (result) => result.filter((r) => r).length);
}

export function count<T>(arr: T[], fn: CallbackFn<T, boolean>): number;
export function count<T>(arr: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<number>;
export function count<T>(arr: T[], fn: CallbackFn<T, MaybePromise<boolean>>): MaybePromise<number> {
  return countImpl.call<T[], [CallbackFn<T, MaybePromise<boolean>>], MaybePromise<number>>(arr, fn);
}
