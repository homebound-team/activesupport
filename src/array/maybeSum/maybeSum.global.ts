import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { MaybePromise } from "src/utils";
import { maybeSum } from "./maybeSum.impl";

declare global {
  interface Array<T> {
    /**
     * Sums numbers in the array but returns `undefined` if the array is empty or contains only `null`/`undefined` values.
     * This helps distinguish between "sum is zero" vs "no values to sum".
     * @returns The sum of all numbers, or undefined if there are no defined values
     * @example [1, 2, 3].maybeSum() //=> 6
     * @example [undefined, null].maybeSum() //=> undefined
     * @example [].maybeSum() //=> undefined
     */
    maybeSum(this: (number | undefined)[]): number | undefined;
    /**
     * Sums all bigints in the array, returning `undefined` if empty or all values are `undefined`.
     * @returns The sum of all bigints, or undefined if there are no defined values
     * @example [1n, 2n, 3n].maybeSum() //=> 6n
     */
    maybeSum(this: (bigint | undefined)[]): bigint | undefined;
    /**
     * Sums values extracted by a callback from the array, returning `undefined` if empty or all values are `undefined`.
     * @param fn A function that returns a number for each element
     * @returns The sum of all returned numbers, or undefined if there are no defined values
     * @example [{x: 1}, {x: 2}].maybeSum(o => o.x) //=> 3
     */
    maybeSum(fn: CallbackFn<T, number | undefined>): number | undefined;
    /**
     * Sums bigint values extracted by a callback from the array, returning `undefined` if empty or all values are `undefined`.
     * @param fn A function that returns a bigint for each element
     * @returns The sum of all returned bigints, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFn<T, bigint | undefined>): bigint | undefined;
    /**
     * Sums values extracted by an async callback from the array, returning `undefined` if empty or all values are `undefined`.
     * @param fn An async function that returns a number for each element
     * @returns A promise resolving to the sum, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFn<T, Promise<number | undefined>>): Promise<number | undefined>;
    /**
     * Sums bigint values extracted by an async callback from the array, returning `undefined` if empty or all values are `undefined`.
     * @param fn An async function that returns a bigint for each element
     * @returns A promise resolving to the sum, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
  }

  interface ReadonlyArray<T> {
    /**
     * Sums numbers in the array but returns `undefined` if the array is empty or contains only `null`/`undefined` values.
     * This helps distinguish between "sum is zero" vs "no values to sum".
     * @returns The sum of all numbers, or undefined if there are no defined values
     * @example [1, 2, 3].maybeSum() //=> 6
     * @example [undefined, null].maybeSum() //=> undefined
     * @example [].maybeSum() //=> undefined
     */
    maybeSum(this: readonly (number | undefined)[]): number | undefined;
    /**
     * Sums all bigints in the array, returning `undefined` if empty or all values are `undefined`.
     * @returns The sum of all bigints, or undefined if there are no defined values
     * @example [1n, 2n, 3n].maybeSum() //=> 6n
     */
    maybeSum(this: readonly (bigint | undefined)[]): bigint | undefined;
    /**
     * Sums values extracted by a callback from the array, returning `undefined` if empty or all values are `undefined`.
     * @param fn A function that returns a number for each element
     * @returns The sum of all returned numbers, or undefined if there are no defined values
     * @example [{x: 1}, {x: 2}].maybeSum(o => o.x) //=> 3
     */
    maybeSum(fn: CallbackFnRO<T, number | undefined>): number | undefined;
    /**
     * Sums bigint values extracted by a callback from the array, returning `undefined` if empty or all values are `undefined`.
     * @param fn A function that returns a bigint for each element
     * @returns The sum of all returned bigints, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFnRO<T, bigint | undefined>): bigint | undefined;
    /**
     * Sums values extracted by an async callback from the array, returning `undefined` if empty or all values are `undefined`.
     * @param fn An async function that returns a number for each element
     * @returns A promise resolving to the sum, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFnRO<T, Promise<number | undefined>>): Promise<number | undefined>;
    /**
     * Sums bigint values extracted by an async callback from the array, returning `undefined` if empty or all values are `undefined`.
     * @param fn An async function that returns a bigint for each element
     * @returns A promise resolving to the sum, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFnRO<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
  }
}

Array.prototype.maybeSum = function <T>(this: T[], fn?: CallbackFn<T, MaybePromise<number | bigint | undefined>>) {
  return maybeSum(this, fn as any);
} as any;
