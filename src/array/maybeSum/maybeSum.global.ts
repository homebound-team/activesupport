import { maybeSum } from "src/array/maybeSum/maybeSum.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { MaybePromise } from "src/utils";

declare global {
  interface Array<T> {
    /**
     * Sums all numbers in the array, returning `undefined` if empty or all values are `undefined`.
     * @returns The sum of all numbers, or undefined if there are no defined values
     * @example [1, 2, 3].maybeSum() //=> 6
     * @example [undefined, undefined].maybeSum() //=> undefined
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
     * Sums values extracted by a callback, returning `undefined` if empty or all values are `undefined`.
     * @param fn A function that returns a number for each element
     * @returns The sum of all returned numbers, or undefined if there are no defined values
     * @example [{x: 1}, {x: 2}].maybeSum(o => o.x) //=> 3
     */
    maybeSum(fn: CallbackFn<T, number | undefined>): number | undefined;
    /**
     * Sums bigint values extracted by a callback, returning `undefined` if empty or all values are `undefined`.
     * @param fn A function that returns a bigint for each element
     * @returns The sum of all returned bigints, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFn<T, bigint | undefined>): bigint | undefined;
    /**
     * Sums values extracted by an async callback, returning `undefined` if empty or all values are `undefined`.
     * @param fn An async function that returns a number for each element
     * @returns A promise resolving to the sum, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFn<T, Promise<number | undefined>>): Promise<number | undefined>;
    /**
     * Sums bigint values extracted by an async callback, returning `undefined` if empty or all values are `undefined`.
     * @param fn An async function that returns a bigint for each element
     * @returns A promise resolving to the sum, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
  }

  interface ReadonlyArray<T> {
    /**
     * Sums all numbers in the array, returning `undefined` if empty or all values are `undefined`.
     * @returns The sum of all numbers, or undefined if there are no defined values
     * @example [1, 2, 3].maybeSum() //=> 6
     * @example [undefined, undefined].maybeSum() //=> undefined
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
     * Sums values extracted by a callback, returning `undefined` if empty or all values are `undefined`.
     * @param fn A function that returns a number for each element
     * @returns The sum of all returned numbers, or undefined if there are no defined values
     * @example [{x: 1}, {x: 2}].maybeSum(o => o.x) //=> 3
     */
    maybeSum(fn: CallbackFnRO<T, number | undefined>): number | undefined;
    /**
     * Sums bigint values extracted by a callback, returning `undefined` if empty or all values are `undefined`.
     * @param fn A function that returns a bigint for each element
     * @returns The sum of all returned bigints, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFnRO<T, bigint | undefined>): bigint | undefined;
    /**
     * Sums values extracted by an async callback, returning `undefined` if empty or all values are `undefined`.
     * @param fn An async function that returns a number for each element
     * @returns A promise resolving to the sum, or undefined if there are no defined values
     */
    maybeSum(fn: CallbackFnRO<T, Promise<number | undefined>>): Promise<number | undefined>;
    /**
     * Sums bigint values extracted by an async callback, returning `undefined` if empty or all values are `undefined`.
     * @param fn An async function that returns a bigint for each element
     * @returns A promise resolving to the sum, or undefined if there are no defined values
     */
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
