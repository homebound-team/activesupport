import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { Comparable, compare } from "src/utils";

/**
 * Returns the maximum value from an array of comparable elements (numbers, strings, dates, etc.).
 * @returns The largest element in the array
 * @example [1, 5, 3].max() //=> 5
 * @example ["11", "23", "222"].max() //=> "23"
 * @example [new Date("2023-01-01"), new Date("2024-01-01")].max() //=> new Date("2024-01-01")
 */
export function max<T extends Comparable>(arr: readonly T[]): T;
/**
 * Returns the maximum value after transforming each element with a callback.
 * @param fn A function that returns a comparable value for each element
 * @returns The largest value returned by the callback
 * @example ["11", "23", "222"].max(s => parseInt(s)) //=> 222
 */
export function max<T, R extends Comparable>(arr: T[], fn: CallbackFn<T, R>): R;
/**
 * Returns the maximum value after transforming each element with a callback.
 * @param fn A function that returns a comparable value for each element
 * @returns The largest value returned by the callback
 * @example ["11", "23", "222"].max(s => parseInt(s)) //=> 222
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
