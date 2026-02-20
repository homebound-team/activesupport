import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { asyncFilter } from "./asyncFilter.impl";

declare global {
  interface Array<T> {
    /**
     * Filters the array using an async callback, waiting for all callbacks to resolve.
     * @param fn An async function to test each element
     * @returns A promise resolving to an array of elements that passed the callback
     * @example await [1, 2, 3, 4].asyncFilter(async n => n % 2 === 0) //=> [2, 4]
     * @example await [].asyncFilter(async n => true) //=> []
     */
    asyncFilter(fn: CallbackFn<T, Promise<boolean>>): Promise<T[]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Filters the array using an async callback, waiting for all callbacks to resolve.
     * @param fn An async function to test each element
     * @returns A promise resolving to an array of elements that passed the callback
     * @example await [1, 2, 3, 4].asyncFilter(async n => n % 2 === 0) //=> [2, 4]
     * @example await [].asyncFilter(async n => true) //=> []
     */
    asyncFilter(fn: CallbackFnRO<T, Promise<boolean>>): Promise<T[]>;
  }
}

Array.prototype.asyncFilter = function <T>(this: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<T[]> {
  return asyncFilter(this, fn);
};
