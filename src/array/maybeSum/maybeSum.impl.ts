import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

/**
 * Sums numbers in an array but returns `undefined` if the array is empty or contains only `null`/`undefined` values.
 * This helps distinguish between "sum is zero" vs "no values to sum".
 * @param arr - The array of numbers to sum
 * @returns The sum of all numbers, or undefined if there are no defined values
 * @example
 * maybeSum([1, 2, 3])
 * //=> 6
 * @example
 * maybeSum([undefined, null])
 * //=> undefined
 * @example
 * maybeSum([])
 * //=> undefined
 */
function maybeSum(arr: (number | undefined)[]): number | undefined;
/**
 * Sums all bigints in an array, returning `undefined` if empty or all values are `undefined`.
 * @param arr - The array of bigints to sum
 * @returns The sum of all bigints, or undefined if there are no defined values
 * @example
 * maybeSum([1n, 2n, 3n])
 * //=> 6n
 */
function maybeSum(arr: (bigint | undefined)[]): bigint | undefined;
/**
 * Sums values extracted by a callback from an array, returning `undefined` if empty or all values are `undefined`.
 * @param arr - The array to sum values from
 * @param fn - A function that returns a number for each element
 * @returns The sum of all returned numbers, or undefined if there are no defined values
 * @example
 * maybeSum([{x: 1}, {x: 2}], o => o.x)
 * //=> 3
 */
function maybeSum<T>(arr: T[], fn: CallbackFn<T, number | undefined>): number | undefined;
/**
 * Sums bigint values extracted by a callback from an array, returning `undefined` if empty or all values are `undefined`.
 * @param arr - The array to sum values from
 * @param fn - A function that returns a bigint for each element
 * @returns The sum of all returned bigints, or undefined if there are no defined values
 */
function maybeSum<T>(arr: T[], fn: CallbackFn<T, bigint | undefined>): bigint | undefined;
/**
 * Sums values extracted by a callback from an array, returning `undefined` if empty or all values are `undefined`.
 * @param arr - The array to sum values from
 * @param fn - A function that returns a number for each element
 * @returns The sum of all returned numbers, or undefined if there are no defined values
 * @example
 * maybeSum([{x: 1}, {x: 2}], o => o.x)
 * //=> 3
 */
function maybeSum<T>(arr: readonly T[], fn: CallbackFnRO<T, number | undefined>): number | undefined;
/**
 * Sums bigint values extracted by a callback from an array, returning `undefined` if empty or all values are `undefined`.
 * @param arr - The array to sum values from
 * @param fn - A function that returns a bigint for each element
 * @returns The sum of all returned bigints, or undefined if there are no defined values
 */
function maybeSum<T>(arr: readonly T[], fn: CallbackFnRO<T, bigint | undefined>): bigint | undefined;
/**
 * Sums values extracted by an async callback from an array, returning `undefined` if empty or all values are `undefined`.
 * @param arr - The array to sum values from
 * @param fn - An async function that returns a number for each element
 * @returns A promise resolving to the sum, or undefined if there are no defined values
 */
function maybeSum<T>(arr: T[], fn: CallbackFn<T, Promise<number | undefined>>): Promise<number | undefined>;
/**
 * Sums bigint values extracted by an async callback from an array, returning `undefined` if empty or all values are `undefined`.
 * @param arr - The array to sum values from
 * @param fn - An async function that returns a bigint for each element
 * @returns A promise resolving to the sum, or undefined if there are no defined values
 */
function maybeSum<T>(arr: T[], fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
/**
 * Sums values extracted by an async callback from an array, returning `undefined` if empty or all values are `undefined`.
 * @param arr - The array to sum values from
 * @param fn - An async function that returns a number for each element
 * @returns A promise resolving to the sum, or undefined if there are no defined values
 */
function maybeSum<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<number | undefined>>): Promise<number | undefined>;
/**
 * Sums bigint values extracted by an async callback from an array, returning `undefined` if empty or all values are `undefined`.
 * @param arr - The array to sum values from
 * @param fn - An async function that returns a bigint for each element
 * @returns A promise resolving to the sum, or undefined if there are no defined values
 */
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
