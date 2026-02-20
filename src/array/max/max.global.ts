import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { Comparable } from "src/utils";
import { max } from "./max.impl";

declare global {
  interface Array<T> {
    /**
     * Returns the maximum value from the array of comparable elements (numbers, strings, dates, etc.).
     * @returns The largest element in the array
     * @example [1, 5, 3].max() //=> 5
     * @example ["11", "23", "222"].max() //=> "23"
     * @example [new Date("2023-01-01"), new Date("2024-01-01")].max() //=> new Date("2024-01-01")
     */
    max(): T;
    /**
     * Returns the maximum value after transforming each element of the array with a callback.
     * @param fn A function that returns a comparable value for each element
     * @returns The largest value returned by the callback
     * @example ["11", "23", "222"].max(s => parseInt(s)) //=> 222
     */
    max<R extends Comparable>(fn: CallbackFn<T, R>): R;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the maximum value from the array of comparable elements (numbers, strings, dates, etc.).
     * @returns The largest element in the array
     * @example [1, 5, 3].max() //=> 5
     * @example ["11", "23", "222"].max() //=> "23"
     * @example [new Date("2023-01-01"), new Date("2024-01-01")].max() //=> new Date("2024-01-01")
     */
    max(): T;
    /**
     * Returns the maximum value after transforming each element of the array with a callback.
     * @param fn A function that returns a comparable value for each element
     * @returns The largest value returned by the callback
     * @example ["11", "23", "222"].max(s => parseInt(s)) //=> 222
     */
    max<R extends Comparable>(fn: CallbackFnRO<T, R>): R;
  }
}

Array.prototype.max = function <T, R extends Comparable>(this: T[], fn?: CallbackFn<T, R>) {
  return max(this, fn as any);
} as any;
