import { maybeSum } from "src/array/maybeSum/maybeSum.impl";
import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise, maybePromiseThen } from "src/utils";

function sum(arr: readonly (number | undefined)[]): number;
function sum(arr: readonly (bigint | undefined)[]): bigint;
function sum<T>(arr: T[], fn: CallbackFn<T, number | undefined>): number;
function sum<T>(arr: T[], fn: CallbackFn<T, bigint | undefined>): bigint;
function sum<T>(arr: readonly T[], fn: CallbackFnRO<T, number | undefined>): number;
function sum<T>(arr: readonly T[], fn: CallbackFnRO<T, bigint | undefined>): bigint;
function sum<T>(arr: T[], fn: CallbackFn<T, Promise<number | undefined>>): Promise<number>;
function sum<T>(arr: T[], fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint>;
function sum<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<number | undefined>>): Promise<number>;
function sum<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<bigint | undefined>>): Promise<bigint>;
function sum<T>(
  arr: readonly T[],
  fn?: CallbackFnEither<T, MaybePromise<number | bigint | undefined>>,
): MaybePromise<number | bigint> {
  return maybePromiseThen(maybeSum(arr as T[], fn as CallbackFn<T>), orZero);
}

export { sum };

// Defined separately to avoid creating a closure for every runtime call
function orZero(n: number | bigint | undefined): number | bigint {
  return n ?? 0;
}
