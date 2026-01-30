import { maybeSum } from "src/array/maybeSum/maybeSum.impl";
import { CallbackFn } from "src/array/utils";
import { MaybePromise, maybePromiseThen } from "src/utils";

function orZero(n: number | bigint | undefined): number | bigint {
  return n ?? 0;
}

export function sumImpl<T, R extends number | bigint | undefined>(
  this: T[] | R[],
  fn?: CallbackFn<T, MaybePromise<R>>,
): MaybePromise<number | bigint> {
  if (fn) return maybePromiseThen(maybeSum(this as T[], fn as any), orZero);
  return maybeSum(this as any) ?? 0;
}

export function sum<T, R extends number | undefined>(arr: R[]): number;
export function sum<T, R extends number | undefined>(arr: T[], f: CallbackFn<T, R>): number;
export function sum<T, R extends number | undefined>(arr: T[], f: CallbackFn<T, Promise<R>>): Promise<number>;
export function sum<T, R extends bigint | undefined>(arr: R[]): bigint;
export function sum<T, R extends bigint | undefined>(arr: T[], f: CallbackFn<T, R>): bigint;
export function sum<T, R extends bigint | undefined>(arr: T[], f: CallbackFn<T, Promise<R>>): Promise<bigint>;
export function sum<T, R extends number | bigint | undefined>(
  arr: T[] | R[],
  fn?: CallbackFn<T, MaybePromise<R>>,
): MaybePromise<number | bigint> {
  return sumImpl.call<T[] | R[], [CallbackFn<T, MaybePromise<R>> | undefined], MaybePromise<number | bigint>>(arr, fn);
}
