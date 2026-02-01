import { maybeSum } from "src/array/maybeSum/maybeSum.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { MaybePromise } from "src/utils";

declare global {
  interface Array<T> {
    /**
     * Sums numbers but returns `undefined` if the array is empty or contains only `null`/`undefined` values.
     * This helps distinguish between "sum is zero" vs "no values to sum".
     * @returns The sum of all numbers, or undefined if there are no defined values
     * @example [1, 2, 3].maybeSum() //=> 6
     * @example [undefined, null].maybeSum() //=> undefined1
     * @example [].maybeSum() //=> undefined
     */
    maybeSum(this: (number | undefined)[]): number | undefined;
    maybeSum(this: (bigint | undefined)[]): bigint | undefined;
    maybeSum(fn: CallbackFn<T, number | undefined>): number | undefined;
    maybeSum(fn: CallbackFn<T, bigint | undefined>): bigint | undefined;
    maybeSum(fn: CallbackFn<T, Promise<number | undefined>>): Promise<number | undefined>;
    maybeSum(fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
  }

  interface ReadonlyArray<T> {
    /**
     * Sums numbers but returns `undefined` if the array is empty or contains only `null`/`undefined` values.
     * This helps distinguish between "sum is zero" vs "no values to sum".
     * @returns The sum of all numbers, or undefined if there are no defined values
     * @example [1, 2, 3].maybeSum() //=> 6
     * @example [undefined, null].maybeSum() //=> undefined
     * @example [].maybeSum() //=> undefined
     */
    maybeSum(this: readonly (number | undefined)[]): number | undefined;
    maybeSum(this: readonly (bigint | undefined)[]): bigint | undefined;
    maybeSum(fn: CallbackFnRO<T, number | undefined>): number | undefined;
    maybeSum(fn: CallbackFnRO<T, bigint | undefined>): bigint | undefined;
    maybeSum(fn: CallbackFnRO<T, Promise<number | undefined>>): Promise<number | undefined>;
    maybeSum(fn: CallbackFnRO<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
  }
}

export function impl(this: (number | undefined)[]): number | undefined;
export function impl(this: (bigint | undefined)[]): bigint | undefined;
export function impl<T>(this: T[], fn: CallbackFn<T, number | undefined>): number | undefined;
export function impl<T>(this: T[], fn: CallbackFn<T, bigint | undefined>): bigint | undefined;
export function impl<T>(this: T[], fn: CallbackFn<T, Promise<number | undefined>>): Promise<number | undefined>;
export function impl<T>(this: T[], fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
export function impl<T>(
  this: T[],
  fn?: CallbackFn<T, MaybePromise<number | bigint | undefined>>,
): MaybePromise<number | bigint | undefined> {
  return maybeSum(this, fn as CallbackFn<T>) as MaybePromise<number | bigint | undefined>;
}

Array.prototype.maybeSum = impl;
