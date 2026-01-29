import { maybeSumImpl } from "src/array/maybeSum/maybeSum.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";

declare global {
  interface Array<T> {
    /**
     * Sums numbers but returns `undefined` if the array is empty or contains only `null`/`undefined` values.
     * This helps distinguish between "sum is zero" vs "no values to sum".
     * @returns The sum of all numbers, or undefined if there are no defined values
     * @example [1, 2, 3].maybeSum() //=> 6
     * @example [undefined, null].maybeSum() //=> undefined
     * @example [].maybeSum() //=> undefined
     */
    maybeSum(this: (number | undefined)[]): number | undefined;
    maybeSum(f: CallbackFn<T, number | undefined>): number | undefined;
    maybeSum(f: CallbackFn<T, Promise<number | undefined>>): Promise<number | undefined>;
    maybeSum(this: (bigint | undefined)[]): bigint | undefined;
    maybeSum(f: CallbackFn<T, bigint | undefined>): bigint | undefined;
    maybeSum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
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
    maybeSum(f: CallbackFnRO<T, number | undefined>): number | undefined;
    maybeSum(f: CallbackFnRO<T, Promise<number | undefined>>): Promise<number | undefined>;
    maybeSum(this: readonly (bigint | undefined)[]): bigint | undefined;
    maybeSum(f: CallbackFn<T, bigint | undefined>): bigint | undefined;
    maybeSum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
  }
}

Array.prototype.maybeSum = maybeSumImpl;
