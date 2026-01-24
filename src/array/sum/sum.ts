import { MaybePromise, maybePromiseAllThen } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Sums all numbers in the array, treating `undefined` as 0. Returns 0 for empty arrays.
     * @returns The sum of all numbers
     * @example [1, 2, 3].sum() //=> 6
     * @example [1, undefined, 3].sum() //=> 4
     * @example [].sum() //=> 0
     */
    sum(this: (number | undefined)[]): number;
    /**
     * Sums values extracted by a callback, treating `undefined` as 0. Returns 0 for empty arrays.
     * @param f A function that returns a number for each element
     * @returns The sum of all returned numbers
     * @example [{x: 1}, {x: 2}].sum(o => o.x) //=> 3
     */
    sum(f: CallbackFn<T, number | undefined>): number;
    /**
     * Sums values extracted by an async callback, treating `undefined` as 0.
     * @param f An async function that returns a number for each element
     * @returns A promise resolving to the sum of all returned numbers
     * @example await [{x: 1}, {x: 2}].sum(async o => o.x) //=> 3
     */
    sum(f: CallbackFn<T, Promise<number | undefined>>): Promise<number>;
    /**
     * Sums all bigints in the array, treating `undefined` as 0n. Returns 0n for empty arrays.
     * @returns The sum of all bigints
     * @example [1n, 2n, 3n].sum() //=> 6n
     */
    sum(this: (bigint | undefined)[]): bigint;
    /**
     * Sums bigint values extracted by a callback, treating `undefined` as 0n.
     * @param f A function that returns a bigint for each element
     * @returns The sum of all returned bigints
     */
    sum(f: CallbackFn<T, bigint | undefined>): bigint;
    /**
     * Sums bigint values extracted by an async callback, treating `undefined` as 0n.
     * @param f An async function that returns a bigint for each element
     * @returns A promise resolving to the sum of all returned bigints
     */
    sum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint>;
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
     * Sums all numbers in the array, treating `undefined` as 0. Returns 0 for empty arrays.
     * @returns The sum of all numbers
     * @example [1, 2, 3].sum() //=> 6
     * @example [1, undefined, 3].sum() //=> 4
     * @example [].sum() //=> 0
     */
    sum(this: readonly (number | undefined)[]): number;
    /**
     * Sums values extracted by a callback, treating `undefined` as 0. Returns 0 for empty arrays.
     * @param f A function that returns a number for each element
     * @returns The sum of all returned numbers
     * @example [{x: 1}, {x: 2}].sum(o => o.x) //=> 3
     */
    sum(f: CallbackFnRO<T, number | undefined>): number;
    /**
     * Sums values extracted by an async callback, treating `undefined` as 0.
     * @param f An async function that returns a number for each element
     * @returns A promise resolving to the sum of all returned numbers
     * @example await [{x: 1}, {x: 2}].sum(async o => o.x) //=> 3
     */
    sum(f: CallbackFnRO<T, Promise<number | undefined>>): Promise<number>;
    /**
     * Sums all bigints in the array, treating `undefined` as 0n. Returns 0n for empty arrays.
     * @returns The sum of all bigints
     * @example [1n, 2n, 3n].sum() //=> 6n
     */
    sum(this: (bigint | undefined)[]): bigint;
    /**
     * Sums bigint values extracted by a callback, treating `undefined` as 0n.
     * @param f A function that returns a bigint for each element
     * @returns The sum of all returned bigints
     */
    sum(f: CallbackFn<T, bigint | undefined>): bigint;
    /**
     * Sums bigint values extracted by an async callback, treating `undefined` as 0n.
     * @param f An async function that returns a bigint for each element
     * @returns A promise resolving to the sum of all returned bigints
     */
    sum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint>;
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

function sum<T, R extends number | undefined>(this: R[]): number;
function sum<T, R extends number | undefined>(f: CallbackFn<T, R>): number;
function sum<T, R extends number | undefined>(f: CallbackFn<T, Promise<R>>): Promise<number>;
function sum<T, R extends bigint | undefined>(this: R[]): bigint;
function sum<T, R extends bigint | undefined>(f: CallbackFn<T, R>): bigint;
function sum<T, R extends bigint | undefined>(f: CallbackFn<T, Promise<R>>): Promise<bigint>;
function sum<T, R extends number | bigint | undefined>(
  this: T[] | R[],
  fn?: CallbackFn<T, MaybePromise<R>>,
): MaybePromise<number | bigint> {
  const promisesOrNumbers = fn ? (this.map(fn as any) as R[] | Promise<R>[]) : (this as R[]);
  return maybePromiseAllThen(promisesOrNumbers, (numbers) => {
    let sum: bigint | number | undefined = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      const number = numbers[i];
      if (number !== undefined) {
        sum = (((sum ?? (typeof number === "bigint" ? 0n : 0)) as any) + number) as any;
      }
    }
    return sum ?? 0;
  });
}

Array.prototype.sum = sum;

function maybeSum<T, R extends number | undefined>(this: R[]): R;
function maybeSum<T, R extends number | undefined>(f: CallbackFn<T, R>): R;
function maybeSum<T, R extends number | undefined>(f: CallbackFn<T, Promise<R>>): Promise<R>;
function maybeSum<T, R extends bigint | undefined>(this: R[]): R;
function maybeSum<T, R extends bigint | undefined>(f: CallbackFn<T, R>): R;
function maybeSum<T, R extends bigint | undefined>(f: CallbackFn<T, Promise<R>>): Promise<R>;
function maybeSum<T, R extends number | bigint | undefined>(
  this: T[] | R[],
  fn?: CallbackFn<T, MaybePromise<R>>,
): MaybePromise<number | bigint | undefined> {
  const promisesOrNumbers = fn ? (this.map(fn as any) as R[] | Promise<R>[]) : (this as R[]);
  return maybePromiseAllThen(promisesOrNumbers, (numbers) => {
    let sum: bigint | number | undefined = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      const number = numbers[i];
      if (number !== undefined) {
        sum = (((sum ?? (typeof number === "bigint" ? 0n : 0)) as any) + number) as any;
      }
    }
    return sum;
  });
}

Array.prototype.maybeSum = maybeSum;
