import { maybeSum } from "src/array/maybeSum/maybeSum.impl";
import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise, maybePromiseThen } from "src/utils";

/**
 * Sums all numbers in an array, treating `undefined` as 0. Returns 0 for empty arrays.
 * @param arr - The array of numbers to sum
 * @returns The sum of all numbers
 * @example
 * sum([1, 2, 3])
 * //=> 6
 * @example
 * sum([1, undefined, 3])
 * //=> 4
 * @example
 * sum([])
 * //=> 0
 */
function sum(arr: readonly (number | undefined)[]): number;
/**
 * Sums all bigints in an array, treating `undefined` as 0n. Returns 0n for empty arrays.
 * @param arr - The array of bigints to sum
 * @returns The sum of all bigints
 * @example
 * sum([1n, 2n, 3n])
 * //=> 6n
 */
function sum(arr: readonly (bigint | undefined)[]): bigint;
/**
 * Sums values extracted by a callback from an array, treating `undefined` as 0. Returns 0 for empty arrays.
 * @param arr - The array to sum values from
 * @param fn - A function that returns a number for each element
 * @returns The sum of all returned numbers
 * @example
 * sum([{x: 1}, {x: 2}], o => o.x)
 * //=> 3
 */
function sum<T>(arr: T[], fn: CallbackFn<T, number | undefined>): number;
/**
 * Sums bigint values extracted by a callback from an array, treating `undefined` as 0n.
 * @param arr - The array to sum values from
 * @param fn - A function that returns a bigint for each element
 * @returns The sum of all returned bigints
 */
function sum<T>(arr: T[], fn: CallbackFn<T, bigint | undefined>): bigint;
/**
 * Sums values extracted by a callback from an array, treating `undefined` as 0. Returns 0 for empty arrays.
 * @param arr - The array to sum values from
 * @param fn - A function that returns a number for each element
 * @returns The sum of all returned numbers
 * @example
 * sum([{x: 1}, {x: 2}], o => o.x)
 * //=> 3
 */
function sum<T>(arr: readonly T[], fn: CallbackFnRO<T, number | undefined>): number;
/**
 * Sums bigint values extracted by a callback from an array, treating `undefined` as 0n.
 * @param arr - The array to sum values from
 * @param fn - A function that returns a bigint for each element
 * @returns The sum of all returned bigints
 */
function sum<T>(arr: readonly T[], fn: CallbackFnRO<T, bigint | undefined>): bigint;
/**
 * Sums values extracted by an async callback from an array, treating `undefined` as 0.
 * @param arr - The array to sum values from
 * @param fn - An async function that returns a number for each element
 * @returns A promise resolving to the sum of all returned numbers
 * @example
 * await sum([{x: 1}, {x: 2}], async o => o.x)
 * //=> 3
 */
function sum<T>(arr: T[], fn: CallbackFn<T, Promise<number | undefined>>): Promise<number>;
/**
 * Sums bigint values extracted by an async callback from an array, treating `undefined` as 0n.
 * @param arr - The array to sum values from
 * @param fn - An async function that returns a bigint for each element
 * @returns A promise resolving to the sum of all returned bigints
 */
function sum<T>(arr: T[], fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint>;
/**
 * Sums values extracted by an async callback from an array, treating `undefined` as 0.
 * @param arr - The array to sum values from
 * @param fn - An async function that returns a number for each element
 * @returns A promise resolving to the sum of all returned numbers
 * @example
 * await sum([{x: 1}, {x: 2}], async o => o.x)
 * //=> 3
 */
function sum<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<number | undefined>>): Promise<number>;
/**
 * Sums bigint values extracted by an async callback from an array, treating `undefined` as 0n.
 * @param arr - The array to sum values from
 * @param fn - An async function that returns a bigint for each element
 * @returns A promise resolving to the sum of all returned bigints
 */
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
