import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

function maybeSum(arr: (number | undefined)[]): number | undefined;
function maybeSum(arr: (bigint | undefined)[]): number | undefined;
function maybeSum(arr: (bigint | undefined)[]): bigint | undefined;
function maybeSum<T>(arr: T[], fn: CallbackFn<T, number | undefined>): number | undefined;
function maybeSum<T>(arr: T[], fn: CallbackFn<T, bigint | undefined>): bigint | undefined;
function maybeSum<T>(arr: readonly T[], fn: CallbackFnRO<T, number | undefined>): number | undefined;
function maybeSum<T>(arr: readonly T[], fn: CallbackFnRO<T, bigint | undefined>): bigint | undefined;
function maybeSum<T>(arr: T[], fn: CallbackFn<T, Promise<number | undefined>>): Promise<number | undefined>;
function maybeSum<T>(arr: T[], fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
function maybeSum<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<number | undefined>>): Promise<number | undefined>;
function maybeSum<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
function maybeSum<T>(
  arr: readonly T[],
  fn?: CallbackFnEither<T, MaybePromise<number | bigint | undefined>>,
): MaybePromise<number | bigint | undefined> {
  const promisesOrNumbers = fn
    ? ((arr as T[]).map(fn) as MaybePromise<number | bigint | undefined>[])
    : (arr as unknown as (number | bigint | undefined)[]);
  return maybePromiseAllThen(promisesOrNumbers, doSum);
}

export { maybeSum };

// Defined separately to avoid creating a closure for every runtime call
function doSum(arr: readonly (number | bigint | undefined)[]): number | bigint | undefined {
  let sum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const number = arr[i];
    if (number !== undefined) {
      sum = (((sum ?? (typeof number === "bigint" ? 0n : 0)) as any) + number) as any;
    }
  }
  return sum;
}
