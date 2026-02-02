import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { Comparable, compare } from "src/utils";

/**
 * Returns the maximum value from an array of comparable elements (numbers, strings, dates, etc.).
 * @param arr The array to find the maximum in
 * @returns The largest element in the array
 * @example max([1, 5, 3]) //=> 5
 * @example max(["11", "23", "222"]) //=> "23"
 * @example max([new Date("2023-01-01"), new Date("2024-01-01")]) //=> new Date("2024-01-01")
 */
export function max<T extends Comparable>(arr: readonly T[]): T;
/**
 * Returns the maximum value after transforming each element of an array with a callback.
 * @param arr The array to find the maximum in
 * @param fn A function that returns a comparable value for each element
 * @returns The largest value returned by the callback
 * @example max(["11", "23", "222"], s => parseInt(s)) //=> 222
 */
export function max<T, R extends Comparable>(arr: T[], fn: CallbackFn<T, R>): R;
/**
 * Returns the maximum value after transforming each element of an array with a callback.
 * @param arr The array to find the maximum in
 * @param fn A function that returns a comparable value for each element
 * @returns The largest value returned by the callback
 * @example max(["11", "23", "222"], s => parseInt(s)) //=> 222
 */
export function max<T, R extends Comparable>(arr: readonly T[], fn: CallbackFnRO<T, R>): R;
export function max<T, R extends Comparable>(arr: readonly T[], fn?: CallbackFnEither<T, R>): R {
  const values = fn ? ((arr as T[]).map(fn) as R[]) : (arr as unknown as R[]);
  let max = values[0];
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, max!) > 0) max = value;
  }
  return max!;
}
