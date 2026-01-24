import { Comparable, compare } from "../utils";
import { CallbackFn, CallbackFnRO, ToArray, ToReadonlyArray } from "./index";

declare global {
  interface Array<T> {
    /**
     * Returns the maximum value from an array of comparable elements (numbers, strings, dates, etc.).
     * @returns The largest element in the array
     * @example [1, 5, 3].max() //=> 5
     * @example ["11", "23", "222"].max() //=> "23"
     * @example [new Date("2023-01-01"), new Date("2024-01-01")].max() //=> new Date("2024-01-01")
     */
    max(this: ToArray<Comparable>): T;
    /**
     * Returns the maximum value after transforming each element with a callback.
     * @param fn A function that returns a comparable value for each element
     * @returns The largest value returned by the callback
     * @example ["11", "23", "222"].max(s => parseInt(s)) //=> 222
     */
    max<R extends Comparable>(fn: CallbackFn<T, R>): R;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the maximum value from an array of comparable elements (numbers, strings, dates, etc.).
     * @returns The largest element in the array
     * @example [1, 5, 3].max() //=> 5
     * @example ["11", "23", "222"].max() //=> "23"
     * @example [new Date("2023-01-01"), new Date("2024-01-01")].max() //=> new Date("2024-01-01")
     */
    max(this: ToReadonlyArray<Comparable>): T;
    /**
     * Returns the maximum value after transforming each element with a callback.
     * @param fn A function that returns a comparable value for each element
     * @returns The largest value returned by the callback
     * @example ["11", "23", "222"].max(s => parseInt(s)) //=> 222
     */
    max<R extends Comparable>(fn: CallbackFnRO<T, R>): R;
  }
}

Array.prototype.max = function <T, R extends Comparable>(this: ToArray<Comparable> | T[], fn?: CallbackFn<T, R>): R {
  const values = fn ? ((this as T[]).map(fn) as R[]) : (this as R[]);
  let max = values.first;
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, max!) > 0) max = value;
  }
  return max!;
};
