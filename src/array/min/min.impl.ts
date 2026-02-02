import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { Comparable, compare } from "src/utils";

/**
 * Returns the minimum value from an array of comparable elements (numbers, strings, dates, etc.).
 * @param arr The array to find the minimum in
 * @returns The smallest element in the array
 * @example min([1, 5, 3]) //=> 1
 * @example min(["-11", "-22", "-222"]) //=> "-11"
 * @example min([new Date("2023-01-01"), new Date("2024-01-01")]) //=> new Date("2023-01-01")
 */
export function min<T extends Comparable>(arr: readonly T[]): T;
/**
 * Returns the minimum value after transforming each element of an array with a callback.
 * @param arr The array to find the minimum in
 * @param fn A function that returns a comparable value for each element
 * @returns The smallest value returned by the callback
 * @example min(["-11", "-22", "-222"], s => parseInt(s)) //=> -222
 */
export function min<T, R extends Comparable>(arr: T[], fn: CallbackFn<T, R>): R;
/**
 * Returns the minimum value after transforming each element of an array with a callback.
 * @param arr The array to find the minimum in
 * @param fn A function that returns a comparable value for each element
 * @returns The smallest value returned by the callback
 * @example min(["-11", "-22", "-222"], s => parseInt(s)) //=> -222
 */
export function min<T, R extends Comparable>(arr: readonly T[], fn: CallbackFnRO<T, R>): R;
export function min<T, R extends Comparable>(arr: readonly T[], fn?: CallbackFnEither<T, R>): R {
  const values = fn ? ((arr as T[]).map(fn) as R[]) : (arr as unknown as R[]);
  let min = values[0];
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, min!) < 0) min = value;
  }
  return min!;
}
