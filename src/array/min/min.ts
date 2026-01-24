import { Comparable, compare } from "../utils";
import { CallbackFn, CallbackFnRO, ToArray, ToReadonlyArray } from "./index";

declare global {
  interface Array<T> {
    /**
     * Returns the minimum value from an array of comparable elements (numbers, strings, dates, etc.).
     * @returns The smallest element in the array
     * @example [1, 5, 3].min() //=> 1
     * @example ["-11", "-22", "-222"].min() //=> "-11"
     * @example [new Date("2023-01-01"), new Date("2024-01-01")].min() //=> new Date("2023-01-01")
     */
    min(this: ToArray<Comparable>): T;
    /**
     * Returns the minimum value after transforming each element with a callback.
     * @param fn A function that returns a comparable value for each element
     * @returns The smallest value returned by the callback
     * @example ["-11", "-22", "-222"].min(s => parseInt(s)) //=> -222
     */
    min<R extends Comparable>(fn: CallbackFn<T, R>): R;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the minimum value from an array of comparable elements (numbers, strings, dates, etc.).
     * @returns The smallest element in the array
     * @example [1, 5, 3].min() //=> 1
     * @example ["-11", "-22", "-222"].min() //=> "-11"
     * @example [new Date("2023-01-01"), new Date("2024-01-01")].min() //=> new Date("2023-01-01")
     */
    min(this: ToReadonlyArray<Comparable>): T;
    /**
     * Returns the minimum value after transforming each element with a callback.
     * @param fn A function that returns a comparable value for each element
     * @returns The smallest value returned by the callback
     * @example ["-11", "-22", "-222"].min(s => parseInt(s)) //=> -222
     */
    min<R extends Comparable>(fn: CallbackFnRO<T, R>): R;
  }
}

Array.prototype.min = function <T, R extends Comparable>(this: ToArray<Comparable>, fn?: CallbackFn<T, R>): R {
  const values = fn ? ((this as T[]).map(fn) as R[]) : (this as R[]);
  let min = values.first;
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, min!) < 0) min = value;
  }
  return min!;
};
