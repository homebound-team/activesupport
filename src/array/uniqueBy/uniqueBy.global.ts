import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { uniqueBy } from "./uniqueBy.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array with duplicates removed based on the value returned by the callback.
     * @param fn A function that returns the value to use for uniqueness comparison
     * @returns A new array containing elements with unique callback values
     * @example [{id: 1}, {id: 2}, {id: 1}].uniqueBy(o => o.id) //=> [{id: 1}, {id: 2}]
     */
    uniqueBy(fn: CallbackFn<T, unknown>): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array with duplicates removed based on the value returned by the callback.
     * @param fn A function that returns the value to use for uniqueness comparison
     * @returns A new array containing elements with unique callback values
     * @example [{id: 1}, {id: 2}, {id: 1}].uniqueBy(o => o.id) //=> [{id: 1}, {id: 2}]
     */
    uniqueBy(fn: CallbackFnRO<T, unknown>): T[];
  }
}

Array.prototype.uniqueBy = function <T>(this: T[], fn: CallbackFn<T, unknown>): T[] {
  return uniqueBy(this, fn);
};
